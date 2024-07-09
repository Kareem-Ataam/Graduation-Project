import { sportsAPI } from "../../Constants";
import Product from "./Product";

export default function SportsProduct(){
    return(
        <div>
        
        <Product 
        prodApi={sportsAPI.product}
        wishApi={sportsAPI.wishlist}
        imageApi={sportsAPI.image}
        name="Sports Products"
        category="sports"
        />
       
    </div>
    )
    }