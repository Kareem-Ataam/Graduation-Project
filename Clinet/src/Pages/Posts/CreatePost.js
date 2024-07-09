import React, { useState } from 'react';
import Button from '../../Components/Button';
import axios from 'axios';
import './posts.css'
import { beautyAPI, sportsAPI, bookAPI, electronicAPI, gamingAPI, fashionAPI } from '../../Constants';
import NavBar from '../../Components/NavBar';
import Foot from '../../Components/Foot';

function ImageCarousel({ images, handleDeleteImage }) {
  return (
    <div className='carousel'>
      {images.map((image, index) => (
        <div key={image.id} className='image-container'>
          <img src={image.url} alt={`Product ${index + 1}`} />
          <button className='delete-btn' onClick={() => handleDeleteImage(image.url)}>&times;</button>
        </div>
      ))}
    </div>
  );
}

export default function CreatePost() {
  const [form, setForm] = useState({
    category: "",
    productName: "",
    brand: "",
    price: 0,
    productDescription: "",
    avgRating: 0,
    comment: "",
    email: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [accept, setAccept] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage({
      url: URL.createObjectURL(file),
      file: file 
    });
    document.getElementsByClassName('upload')[0].style.display = "none";
  };

  const handleDeleteImage = (url) => {
    setSelectedImage(null);
    URL.revokeObjectURL(url); // Free memory when image is deleted
    document.getElementsByClassName('upload')[0].style.display = "flex";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);

    // Form validation
    if (!form.productName || !form.brand || !form.price || !form.productDescription || !selectedImage) {
      return; // Do not proceed if any required field is empty
    }

    try {
      const productData = {
        category: form.category.toLowerCase(),
        productName: form.productName,
        brand: form.brand,
        price: Number(form.price), // Ensure price is sent as a number
        productDescription: form.productDescription,
        avgRating: Number(form.avgRating), // Ensure avgRating is sent as a number
        comment: form.comment,
        email: window.localStorage.getItem('email')

      };

      // Define a function to post data
      async function postData(prod, imag) {
        // Post the product data
        const productResponse = await axios.post(prod, productData,{
          headers:{
            Authorization:`Bearer ${window.localStorage.getItem('token')}`
          }
        });
        if (productResponse.status === 200) {
          const productId = productResponse.data.productId; // Assuming the product ID is returned as 'id'

          // Now upload the selected image with the product ID
          const formData = new FormData();
          formData.append('productId', productId);
          formData.append('productImage', selectedImage.file);

          await axios.post(imag, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization:`Bearer ${window.localStorage.getItem('token')}`
            }
          });

          // Redirect to the post page after successful submission
          window.location.pathname = "/";
        }
      }

      // Call postData based on category
      if (productData.category === "beauty") {
        postData(beautyAPI.product, beautyAPI.image);
      } else if (productData.category === "sports") {
        postData(sportsAPI.product, sportsAPI.image);
      } else if (productData.category === "books") {
        postData(bookAPI.product, bookAPI.image);
      } else if (productData.category === "electronics") {
        postData(electronicAPI.product, electronicAPI.image);
      } else if (productData.category === "gaming") {
        postData(gamingAPI.product, gamingAPI.image);
      } else if (productData.category === "fashion") {
        postData(fashionAPI.product, fashionAPI.image);
      }

    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <NavBar/>
      <div className='post'>
        
        <div>
          Add your product
        </div>
        <form onSubmit={handleSubmit}>
          <div className='uploader'>
            <label htmlFor="upload" className='upload'><i className="fa-solid fa-camera fa-2xl"></i></label>
            <input type="file" accept="image/*" onChange={handleImageChange} id="upload" style={{ display: "none" }} />
            <div className='upload-cont'>
              {selectedImage && (
                <ImageCarousel images={[selectedImage]} handleDeleteImage={handleDeleteImage} />
              )}
            </div>
          </div>
          {!selectedImage && accept && <p className='error-message'>* You must choose an image.</p>}

          <label htmlFor="category">Category</label>
          <select id='category' name='category' onChange={handleChange} value={form.category}>
            <option value="">Select a category...</option>
            <option value="beauty">Beauty</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="gaming">Gaming</option>
            <option value="sports">Sports</option>
            <option value="fashion">Fashion</option>
          </select>
          {!form.category && accept && <p className='error-message'>* This field is required.</p>}

          <label htmlFor="productName">Product Name</label>
          <input type="text" id='productName' name='productName' placeholder="Product Name..." onChange={handleChange} value={form.productName} />
          {!form.productName && accept && <p className='error-message'>* This field is required.</p>}

          <label htmlFor="brand">Brand</label>
          <input type="text" id='brand' name='brand' placeholder="Brand..." onChange={handleChange} value={form.brand} />
          {!form.brand && accept && <p className='error-message'>* This field is required.</p>}

          <label htmlFor="price">Price</label>
          <input type="number" id='price' name='price' placeholder="Price" onChange={handleChange} value={form.price} />
          {!form.price && accept && <p className='error-message'>* This field is required.</p>}

          <label htmlFor="productDescription">Product Description</label>
          <textarea id='productDescription' name='productDescription' placeholder="Product Description" onChange={handleChange} value={form.productDescription} />
          {!form.productDescription && accept && <p className='error-message'>* This field is required.</p>}

          <label htmlFor="avgRating">Avg Rating</label>
          <input type="number" id='avgRating' name='avgRating' placeholder="Avg Rating" onChange={handleChange} value={form.avgRating} max={5} min={0} />
          {!form.avgRating && accept && <p className='error-message'>* This field is required.</p>}

          <label htmlFor="comment">Comment</label>
          <textarea id='comment' name='comment' placeholder="Comment" onChange={handleChange} value={form.comment} />
          {!form.comment && accept && <p className='error-message'>* This field is required.</p>}

          

          <Button className="submit" name="Post" />
        </form>
      </div>
      <Foot/>
    </>
  );
}
