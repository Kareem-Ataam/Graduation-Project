
import { electronicAPI } from "../../Constants";
import Product from "./Product";

export default function ElectronicsProduct(){
    return(
        <div>
      
        <Product 
        prodApi={electronicAPI.product}
        wishApi={electronicAPI.wishlist}
        imageApi={electronicAPI.image}
        name="Electronics Products"
        category="electronics"
        />
       
    </div>
    )
    }