import React, { useEffect, useState } from "react";
import axios from "axios";
import { offlineApi } from "../../Constants";
import Foot from "../../Components/Foot";
import NavBar from "../../Components/NavBar";
import Modal from "../../Components/Modal";

export default function OfflineSearchResult() {
    const wordToSearch = window.localStorage.getItem('global word');
    const token = window.localStorage.getItem('token');
    const [sellerProducts, setSellerProducts] = useState([]);
    const [distances, setDistances] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Fetch seller products
    useEffect(() => {
        axios.get(offlineApi, {
            params: {
                productNameOrDescription: wordToSearch
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log("API Response: ", res.data); // Debug log
            if (res.data === 'No Products Found' ) {
                setModalMessage("No products found");
                setShowModal(true);
                window.location.pathname='/';
            } else {
                setSellerProducts(res.data);
            }
        }).catch(error => {
            console.error("API Error: ", error);
        });
    }, [wordToSearch, token]);

    // Calculate distance between two points in meters
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth radius in meters
        const φ1 = lat1 * (Math.PI / 180);
        const φ2 = lat2 * (Math.PI / 180);
        const Δφ = (lat2 - lat1) * (Math.PI / 180);
        const Δλ = (lon2 - lon1) * (Math.PI / 180);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    }

    // Fetch distances from current location to each seller's location
    useEffect(() => {
        async function fetchDistances() {
            try {
                const { latitude, longitude } = await getCurrentLocation();
                console.log("Current Location: ", latitude, longitude); // Debug log

                const calculatedDistances = sellerProducts.map((seller) => {
                    const distance = calculateDistance(latitude, longitude, seller.latitude, seller.longitude);
                    return distance;
                });

                setDistances(calculatedDistances);
                console.log("Distances: ", calculatedDistances); // Debug log
            } catch (error) {
                console.error("Error getting current location:", error);
            }
        }

        if (sellerProducts.length > 0) {
            fetchDistances();
        }
    }, [sellerProducts]);

    // Get current geolocation
    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    }

    // Open Google Maps with the given latitude and longitude
    const openGoogleMaps = (lat, lng) => {
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.location.href = url;
    };

    return (
        <>
            <NavBar />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <p>{modalMessage}</p>
            </Modal>
            <div className="offline-suggestions-container">
                <h2 className="offline-suggestions-header">Offline Suggestions</h2>
                <div className="product-list">
                    {sellerProducts.map((product, index) => (
                        <div key={index} className="product-card">
                            <div className="item-container">
                                <h2 className="item-heading">Your Product IN: {product.shopName}</h2>
                                <ul className="rating">
                                    Distance to it: {distances[index] !== undefined ? `${(distances[index] / 1000).toFixed(2)} km` : 'Calculating...'}
                                </ul>
                                <button className="item-cart-btn"
                                    onClick={() => openGoogleMaps(product.latitude, product.longitude)}
                                >
                                    Get Location On Google Map
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Foot />
        </>
    );
}
