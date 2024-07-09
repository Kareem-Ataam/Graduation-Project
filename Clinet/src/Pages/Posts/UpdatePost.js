import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button'
import ImageCarousel from'../../Components/ImageCarousel'
import axios from 'axios';
import { beautyAPI, sportsAPI, bookAPI, electronicAPI, gamingAPI, fashionAPI } from '../../Constants';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import Foot from '../../Components/Foot';

export default function UpdatePost() {
    const email = window.localStorage.getItem("email");
    const token = window.localStorage.getItem('token');
    const postId = window.localStorage.getItem("postId");
    const router=useNavigate()

    // State for form fields and selected image
    const [form, setForm] = useState({
        category: "",
        productName: "",
        brand: "",
        price: 0,
        productDescription: "",
        avgRating: 0,
        comment: "",
        email: email
    });

    const [selectedImage, setSelectedImage] = useState(null); // State for selected image
    const [accept, setAccept] = useState(false); // State for form submission acceptance

    useEffect(() => {
        // Fetch existing post details based on postId if needed
        // Example: fetchPostDetails();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage({
            url: URL.createObjectURL(file),
            file: file
        });
        document.getElementsByClassName('upload')[0].style.display = "none";
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
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
               
            };

            // Define a function to update data
            async function updateData(prod, imag) {
                // Update the product data
                const productResponse = await axios.put(`${prod}/${postId}`, productData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (productResponse.status === 200) {
                    const productId = productResponse.data.productId; // Assuming the product ID is returned as 'id'

                    // Upload the updated image if selected
                    if (selectedImage) {
                        const formData = new FormData();
                        formData.append('productId', productId)
                        formData.append('productImage', selectedImage.file);

                        await axios.post(imag, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`
                            }
                        });
                    }

                    // Redirect to the updated post page after successful submission
                    router(`/${form.category}-product`);
                    window.localStorage.removeItem("postId");
                }
            }

            // Call updateData based on category
            switch (productData.category) {
                case "beauty":
                    updateData(beautyAPI.product, beautyAPI.image);
                    break;
                case "sports":
                    updateData(sportsAPI.product, sportsAPI.image);
                    break;
                case "books":
                    updateData(bookAPI.product, bookAPI.image);
                    break;
                case "electronics":
                    updateData(electronicAPI.product, electronicAPI.image);
                    break;
                case "gaming":
                    updateData(gamingAPI.product, gamingAPI.image);
                    break;
                case "fashion":
                    updateData(fashionAPI.product, fashionAPI.image);
                    break;
                default:
                    console.error('Invalid category');
                    break;
            }

        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <>
           <NavBar/>
            <div className='post'>
                <div>
                    Update your product
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

                    <Button className="submit" name="Update" />
                </form>
            </div>
           <Foot/>
        </>
    );
}
