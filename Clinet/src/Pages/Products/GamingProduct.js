
import {gamingAPI} from "../../Constants";
import Product from "./Product";

export default function BooksProduct(){
    return(
        <div>
       
        <Product 
        prodApi={gamingAPI.product}
        wishApi={gamingAPI.wishlist}
        imageApi={gamingAPI.image}
        name="Gaming Products"
        category="gaming"
        />
        
    </div>
    )
    
}