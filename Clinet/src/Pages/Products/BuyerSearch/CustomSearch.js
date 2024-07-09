import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../Components/NavBar";
import Foot from "../../../Components/Foot";

export default function CustomSearch({customApi,wishApi}){
    const wordToSearch = window.localStorage.getItem('local word');
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const token = window.localStorage.getItem('token');
    const email = window.localStorage.getItem('email');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState([]);
    const [showNoItemsModal, setShowNoItemsModal] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5); // Initial number of products to display
    const userType = window.localStorage.getItem('user type');
    useEffect(() => {
        axios.get(customApi, {
            params: {
                query: wordToSearch
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            setProducts(res.data);
        });
    }, [wordToSearch, token]);

    useEffect(() => {
        if (userType === "buyer") {
            axios.get(wishApi, {
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

    useEffect(() => {
        const storedWishlist = JSON.parse(window.localStorage.getItem('wishlist'));
        if (storedWishlist) {
            setWishlistProducts(storedWishlist);
        }
    }, []);

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 5); // Load 5 more products each time
    };

    const IsInWishlist = (prod) => {
        return wishlistProducts.some(wishlistItem => 
            wishlistItem.productId === prod.productId && 
            wishlistItem.category.toLowerCase() === prod.category
        );
    };

    const AddToList = async (prod) => {
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
    
        function getImageForProduct(productId) {
            const productImages = images.filter(image => image.productId === productId);
            return productImages.length > 0 ? productImages[0].url : ''; // Assuming each product has at least one image
        }
    
        return (
            <>
            <NavBar/>
                {userType === "buyer" && (
                    <>
                        <div className="product-list">
                            {products.slice(0, visibleCount).map(product => (
                                <div key={product.productId} className="product-card">
                                    <div className="item-container">
                                        <div
                                            className="main-item"
                                            style={{ backgroundImage: `url(${getImageForProduct(product.productId)})` }}
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
                    </>
                )}
                <Foot/>
            </>
        );
    };




        
