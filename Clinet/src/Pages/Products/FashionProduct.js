
import { fashionAPI } from "../../Constants";
import Product from "./Product";

export default function FashionProduct(){
    return(
        <div>
        
        <Product 
        prodApi={fashionAPI.product}
        wishApi={fashionAPI.wishlist}
        imageApi={fashionAPI.image}
        name="Fashion Products"
        category="fashion"
        
        />
        
    </div>
    )
    }