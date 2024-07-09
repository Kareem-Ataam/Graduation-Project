import { useEffect, useState } from "react";
import { beautyAPI, bookAPI, buyerProductAPI, electronicAPI, gamingAPI, globSearch, sportsAPI, fashionAPI } from "../../Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import Foot from "../../Components/Foot";

export default function GlobalSearchResult() {

    const wordToSearch = window.localStorage.getItem('global word');
    const token = window.localStorage.getItem('token');
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const userType = window.localStorage.getItem('user type');
    const email = window.localStorage.getItem('email');
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState([]);
    const [showNoItemsModal, setShowNoItemsModal] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5); // Initial number of products to display
   

    //get all products by search api, needed the query word
    useEffect(() => {
        axios.get(globSearch, {
            params: {
                query: wordToSearch
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.length === 0) {
                console.log(res)
                setShowNoItemsModal(true);
                //to return to home page if not found the item he/she searched for
                
            }
            setProducts(res.data);
        });

    }, [wordToSearch, token]);

    //get all wishlist products of current buyer
    useEffect(() => {
        if (userType === "buyer") {
            axios.get(buyerProductAPI, {
                params: { email: email },
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setWishlistProducts(response.data);
                    window.localStorage.setItem('wishlist', JSON.stringify(response.data));
                })
                .catch(error => {
                    console.error('Error fetching buyer wishlist products:', error);
                });
        }
    }, [userType, email, token]);

  
    //handle show more product when clicked see more button
    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 5); // Load 5 more products each time
    };

  //update wishlist products to use it to check if there is a products in the wishlist or not
  useEffect(() => {
    const storedWishlist = JSON.parse(window.localStorage.getItem('wishlist'));
    if (storedWishlist) {
        setWishlistProducts(storedWishlist);
    }
}, []);
 
 //check product in wishlist or not
    const IsInWishlist = (prod) => {
        return wishlistProducts.some(wishlistItem => 
            wishlistItem.productId === prod.productId && 
            wishlistItem.category.toLowerCase() === prod.category
        );
    };

    // handle adding the product shown on results in wishlist
    const AddToList = async (prod) => {
        const category = prod.category;
        async function PostInWishList(wishApi) {
            try {
                let res = await axios.post(wishApi, {
                    email: email,
                    productId: prod.productId,
                    comment: prod.comment
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        accept: 'text/plain',
                    },
                });

                if (res.status === 201) {
                    setShowModal(true);
                    window.localStorage.setItem('id', prod.productId);

                    // Update UI to reflect product added to wishlist
                    const updatedProducts = products.map(product => {
                        if (product.productId === prod.productId) {
                            return {
                                ...product,
                                isInWishlist: true // Mark as added to wishlist
                            };
                        }
                        return product;
                    });
                    setProducts(updatedProducts);

                    // Update wishlist products
                    const updatedWishlist = [...wishlistProducts, prod];
                    setWishlistProducts(updatedWishlist);
                    window.localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                }
            } catch (error) {
                console.error('Error adding to wishlist:', error);
            }
        };
        switch (category.toLowerCase()) {
            case "beauty":
                PostInWishList(beautyAPI.wishlist);
                break;
            case "sports":
                PostInWishList(sportsAPI.wishlist);
                break;
            case "books":
                PostInWishList(bookAPI.wishlist);
                break;
            case "electronics":
                PostInWishList(electronicAPI.wishlist);
                break;
            case "gaming":
                PostInWishList(gamingAPI.wishlist);
                break;
            case "fashion":
                PostInWishList(fashionAPI.wishlist);
                break;
            default:
                console.error('Invalid category');
                break;
        }
    };

    //open or close modal

    function Modal({ onClose, children }) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <p>{children}</p>
                </div>
            </div>
        );
    }

  
    
    // Function to convert base64 to data URL
const base64ToDataURL = (base64String) => {
    return `data:image/png;base64,${base64String}`;
    // Adjust the MIME type (image/jpeg, image/png, etc.) as per your image format
  };

    return (<>
    <NavBar/>
        {/* this code show the result of each product result from search with the ability to add it to wishlist */}
        
            {userType === "buyer" && (
                <>
                <h1>Search Results </h1>
                
                    <Link to='/offlinesearch' id="toOffline">Suggested Shops buy same product</Link>
                    <Link to='/onlinesearch' id="onlineResults">Suggested Online Products</Link>
                    
                    <div className="product-list">
                        {products.slice(0, visibleCount).map((product,index) => (
                            <div key={index} className="product-card">
                                <div className="item-container">
                                    <div
                                        className="main-item"
                                        style={{ backgroundImage: `url(${base64ToDataURL(images[index])})`  }}
                                    ></div>
                                    <h2 className="item-heading">{product.productName}</h2>
                                    <ul className="rating">
                                        <i className="fa-solid fa-star"></i> <span>{product.avgRating}</span>
                                    </ul>
                                    <p className="item-price"><b>$</b>{product.price}</p>
                                    <button
                                        className="item-cart-btn"
                                        onClick={() => AddToList(product)}
                                        disabled={IsInWishlist(product) || product.isInWishlist}
                                    >
                                        {IsInWishlist(product) || product.isInWishlist ? 'Added' : 'Add To Wishlist'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                

                    {visibleCount < products.length && (
                        <div><button onClick={handleSeeMore} className="see-more-btn">See More</button></div>
                    )}

                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>Product added to Wishlist!</Modal>
                    )}

                    {showNoItemsModal && (
                        <Modal onClose={() => setShowNoItemsModal(false)}>No items found!</Modal>
                    )}
                </>
            )}
            <Foot/>
        </>
    );
}
