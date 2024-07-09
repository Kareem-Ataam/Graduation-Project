import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css';
import { onlineApi } from '../../Constants';
import NavBar from '../../Components/NavBar';
import Foot from '../../Components/Foot';

export default function OnlineSearch() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Initial number of products to display
  const [showNoItemsModal, setShowNoItemsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading indicator
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Function to fetch products asynchronously
    const fetchProducts = async () => {
      console.log("test", window.localStorage.getItem('global word'));
      try {
        const response = await axios.get(`${onlineApi}/${window.localStorage.getItem('global word')}`, {
          headers: {
            'Accept': 'text/plain'
          }
        });
        console.log(response.data); // Log the response data for debugging

        setProducts(response.data);
        setIsLoading(false); // Turn off loading indicator
        // Check if there are no products returned or if the status is 401
        if (response.data.length === 0 || response.status === 401) {
          setErrorMessage('Oops, there is a problem now, you can go to Amazon directly.');
          setShowNoItemsModal(true); // Show modal if no products are found or status is 401
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false); // Turn off loading indicator on error
        setErrorMessage('Oops, there is a problem now, you can go to Amazon directly.');
        setShowNoItemsModal(true); // Show modal on error
      }
    };

    // Call fetchProducts function when component mounts
    fetchProducts();
  }, []); // Run once on component mount

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 5); // Load 5 more products each time
  };

  function Modal({ onClose, children }) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <p>{children}</p>
          <a
            href={`https://www.amazon.eg/s?k=${window.localStorage.getItem('global word')}&ref=nb_sb_noss`}
            target="_blank"
            rel="noopener noreferrer"
            className="amazon-link-btn"
          >
            Go to Amazon
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      {isLoading ? (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="product-list">
            {products.slice(0, visibleCount).map((product, index) => (
              <div key={index} className="product-card">
                <div className="item-container">
                  <div
                    className="main-item"
                    style={{ backgroundImage: `url(${product.imageUrl})` }}
                  ></div>
                  <h2 className="item-heading">{product.title}</h2>
                  <p className="item-price">{product.price}</p>
                  <button
                    className="item-cart-btn"
                    onClick={() => { window.location.href = product.link }}
                  >
                    See The product
                  </button>
                </div>
              </div>
            ))}
          </div>
          {visibleCount < products.length && (
            <div><button onClick={handleSeeMore} className="see-more-btn">See More</button></div>
          )}
          {showNoItemsModal && (
            <Modal onClose={() => setShowNoItemsModal(false)}>
              {errorMessage}
            </Modal>
          )}
        </>
      )}
      <Foot />
    </>
  );
}
