import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css';
import { buyerOrSeller, selleProductsAPI } from '../../Constants';
import NavBar from '../../Components/NavBar';
import Foot from '../../Components/Foot';
import Button from '../../Components/Button';


export default function Product({ prodApi, wishApi, imageApi, name, category }) {
  const [products, setProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [imgId,setImgId]=useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Initial number of products to display
  const [showModal, setShowModal] = useState(false);
  const [showNoItemsModal, setShowNoItemsModal] = useState(false);
  const [query, setQuery] = useState('');
  const token = window.localStorage.getItem('token');
  const email = window.localStorage.getItem('email');
  const userType = window.localStorage.getItem('user type');


  //get category products
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

        if (userType === "seller" && response.data.length === 0) {
          setShowNoItemsModal(true);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    if (userType === "seller") {
      axios.get(`${selleProductsAPI}`, {
        params: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setSellerProducts(response.data);
          if (response.data.length === 0) {
            setShowNoItemsModal(true);
          }
        })
        .catch(error => {
          console.error('Error fetching seller products:', error);
        });
    }
  }, [prodApi]);

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


  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 5); // Load 5 more products each time
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
        const currentWishlist = JSON.parse(window.localStorage.getItem('wishlist')) || [];
        currentWishlist.push(prod);
        window.localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
        setWishlistProducts(currentWishlist);
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

  // handle product delete
  function DeleteProduct(prod,index) {
    const deleteImage = async () => {
      try {
        await axios.delete(`${imageApi}`, {
          params: { id:imgId[index] },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Image deleted");
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    };

    const deleteFromWishlist = async () => {
      try {
        await axios.delete(`${wishApi}/${prod.productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Deleted from wishlist");
      } catch (error) {
        console.error('Error deleting from wishlist:', error);
      }
    };

    const deleteProduct = async () => {
      try {
        await axios.delete(`${prodApi}/${prod.productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res=>{
          console.log("Product deleted");
          window.location.reload();
        })
        
      } catch (error) {
        console.error("");
      }
    };

    const isProductInWishlist = async () => {
      try {
        await axios.get(`${wishApi}/${prod.productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    };

    const handleDelete = async () => {
      const inWishlist = await isProductInWishlist();
      console.log(inWishlist)
      if (inWishlist) {
        await deleteFromWishlist();
      }
      await deleteImage();
      await deleteProduct();

    };

    handleDelete();
  }

  function UpdateProduct(prod,index) {
    window.localStorage.setItem("postId", prod.productId);
    window.localStorage.setItem("imgId ",imgId[index])
    window.location.pathname = `${prod.category}-update/${prod.productId}`;
  }
//search part
const handleInputChange = (e) => {
  setQuery(e.target.value);
};

const handleSearch = (e) => {
  e.preventDefault();
};
// Filtering products based on the search query
const filteredBuyerProducts = products.filter(product =>
  product.productName.toLowerCase().includes(query.toLowerCase())
);

const filteredSellerProducts = sellerProducts.filter(product =>
  product.productName.toLowerCase().includes(query.toLowerCase()) &&
  product.category.toLowerCase() === category.toLowerCase()
);

// Function to convert base64 to data URL
const base64ToDataURL = (base64String) => {
  return `data:image/png;base64,${base64String}`;
  // Adjust the MIME type (image/jpeg, image/png, etc.) as per your image format
};
  
return (
  <>
  <NavBar/>
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </form>
    {userType === "buyer" && (
      <>
        <h2 className='prod-name'>{name}</h2>
        <div className="product-list">
          {filteredBuyerProducts.slice(0, visibleCount).map((product,index) => (
            <div key={index} className="product-card">
              <div className="item-container">
                <div
                  className="main-item"
                  style={{ backgroundImage: `url(${base64ToDataURL(images[index])})` }}
                ></div>
                <h2 className="item-heading">{product.productName}</h2>
                <ul className="rating">
                  <i className="fa-solid fa-star"></i> <span>{product.avgRating}</span>
                </ul>
                <p className="item-price"><b>جنيه</b>{product.price}</p>
                <button
                  className="item-cart-btn"
                  onClick={() => AddToList(product)}
                  disabled={product.isInWishlist}
                >
                  {product.isInWishlist ? 'Added' : 'Add To Wishlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < filteredBuyerProducts.length && (
          <div><button onClick={handleSeeMore} className="see-more-btn">See More</button></div>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>Product added to Wishlist!</Modal>
        )}
      </>
    )}
    {userType === "seller" && (
      <>
        <h2 className='prod-name'>{name}</h2>
        <div className="product-list">
          {filteredSellerProducts.slice(0, visibleCount).map((product,index) => (
            <div key={index} className="product-card">
              <div className="item-container">
                <div
                  className="main-item"
                  style={{ backgroundImage: `url(${base64ToDataURL(images[index])})` }}
                ></div>
                <h2 className="item-heading">{product.productName}</h2>
                <ul className="rating">
                  <i className="fa-solid fa-star"></i> <span>{product.avgRating}</span>
                </ul>
                <p className="item-price"><b>جنيه</b>{product.price}</p>
                <div className="seller-buttons">
                  <button  onClick={() => UpdateProduct(product,index)} className='btn' >Edit</button>
                  <button  onClick={() => DeleteProduct(product,index)} className='btn'>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < filteredSellerProducts.length && (
          <div><button onClick={handleSeeMore} className="see-more-btn">See More</button></div>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>Product added to Wishlist!</Modal>
        )}
        {showNoItemsModal && (
          <Modal onClose={() => setShowNoItemsModal(false)}>
            No items added yet.
            <Button name="Create Post" onClick={() => window.location.pathname = '/createpost'} />
          </Modal>
        )}
      </>
    )}
<Foot/>
    
  </>
);
}