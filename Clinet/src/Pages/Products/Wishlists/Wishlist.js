import { useState, useEffect } from "react";
import axios from "axios";
import { buyerProductAPI } from "../../../Constants";



export default function Wishlist({ prodApi, wishApi, imageApi }) {
    const { products, images, filteredProducts, setFilteredProducts } = useWishlistData({ prodApi, imageApi, buyerProductAPI });
    const [visibleCount, setVisibleCount] = useState(5); // Initial number of products to display
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const userType = window.localStorage.getItem('user type');
    const token = window.localStorage.getItem('token');
    const [imgId,setImgId]=useState([]);

function useWishlistData({ prodApi, imageApi, buyerProductAPI }) {
        const [products, setProducts] = useState([]);
        const [images, setImages] = useState([]);
        
        const [filteredProducts, setFilteredProducts] = useState([]);
        const token = window.localStorage.getItem('token');
        const email = window.localStorage.getItem('email');
    
        useEffect(() => {
            axios.get(prodApi, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    const currentWishlist = JSON.parse(window.localStorage.getItem('wishlist')) || []; // Handle null or empty array
                    const updatedProducts = response.data.map(product => ({
                        ...product,
                        isInWishlist: currentWishlist.some(item => item.productId === product.productId)
                    }));
                    setProducts(updatedProducts);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        }, [prodApi, token]);
    
        useEffect(() => {
            axios.get(imageApi, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setImages(response.data.map(item => item.image));
                    setImgId(response.data.map(item => item.productImageId));
                })
                .catch(error => {
                    console.error('Error fetching images:', error);
                });
        }, [imageApi, token]);
    
        useEffect(() => {
            axios.get(buyerProductAPI, {
                params: { email: email },
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    const filtered = products.filter(product =>
                        response.data.some(wishlistItem =>
                            wishlistItem.productId === product.productId && wishlistItem.category.toLowerCase() === product.category
                        )
                    );
                    setFilteredProducts(filtered);
                })
                .catch(error => {
                    console.error('Error fetching buyer wishlist products:', error);
                });
        }, [buyerProductAPI, email, token, products]);
    
        return { products, images, filteredProducts, setFilteredProducts };
    }
    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 5); // Load 5 more products each time
    };

    function handleDeleteProduct(productId,index) {
        axios.delete(`${imageApi}/${imgId}`)
        axios.delete(`${wishApi}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                
                // Update the state to remove the deleted product from filteredProducts
                setFilteredProducts(prevFilteredProducts =>
                    prevFilteredProducts.filter(product => product.productId !== productId)
                );
                setModalMessage("Product removed successfully from the Wishlist!");
                setShowModal(true);
                window.localStorage.removeItem('wishlist');
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    }

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

    return (
        <>
            {userType === "buyer" && (
                <>
                    <div className="product-list">
                        {filteredProducts.slice(0, visibleCount).map((product,index) => (
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
                                    <p className="item-price"><b>جنيه</b>{product.price}</p>
                                    <button
                                        className="item-cart-btn"
                                        onClick={() => handleDeleteProduct(product.productId,index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < filteredProducts.length && (
                        <div><button onClick={handleSeeMore} className="see-more-btn">See More</button></div>
                    )}

                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>{modalMessage}</Modal>
                    )}
                </>
            )}
        </>
    );
}
