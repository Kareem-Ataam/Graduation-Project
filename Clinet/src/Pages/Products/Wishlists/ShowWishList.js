import React from 'react';
import Foot from "../../../Components/Foot";
import NavBar from "../../../Components/NavBar";
import { beautyAPI, bookAPI, electronicAPI, fashionAPI, gamingAPI, sportsAPI } from "../../../Constants";
import Wishlist from "./Wishlist";


export default function ShowWishlist() {
    return (
        <>
            <NavBar />
            <h1>Wishlist</h1>
            
            <h2>Beauty WishList</h2>
            <div className="wishlist-container">
                <Wishlist
                    prodApi={beautyAPI.product}
                    wishApi={beautyAPI.wishlist}
                    imageApi={beautyAPI.image}
                />
            </div>
            

            <h2>Books WishList</h2>
            <div className="wishlist-container">
                <Wishlist
                    prodApi={bookAPI.product}
                    wishApi={bookAPI.wishlist}
                    imageApi={bookAPI.image}
                />
            </div>
           

            <h2>Electronics WishList</h2>
            <div className="wishlist-container">
                <Wishlist
                    prodApi={electronicAPI.product}
                    wishApi={electronicAPI.wishlist}
                    imageApi={electronicAPI.image}
                />
            </div>
            

            <h2>Fashion WishList</h2>
            <div className="wishlist-container">
                <Wishlist
                    prodApi={fashionAPI.product}
                    wishApi={fashionAPI.wishlist}
                    imageApi={fashionAPI.image}
                />
            </div>
            

            <h2>Gaming WishList</h2>
            <div className="wishlist-container">
                <Wishlist
                    prodApi={gamingAPI.product}
                    wishApi={gamingAPI.wishlist}
                    imageApi={gamingAPI.image}
                />
            </div>
            

            <h2>Sports WishList</h2>
            <div className="wishlist-container">
                <Wishlist
                    prodApi={sportsAPI.product}
                    wishApi={sportsAPI.wishlist}
                    imageApi={sportsAPI.image}
                />
            </div>

            <Foot />
        </>
    );
}
