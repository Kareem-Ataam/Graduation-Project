import { beautyAPI } from "../../Constants";
import Product from "./Product";

export default function BeautyProduct(){
return(
    <div>
        <Product 
        prodApi={beautyAPI.product}
        wishApi={beautyAPI.wishlist}
        imageApi={beautyAPI.image}
        name="Beauty Products"
        category="beauty"
        />
        
    </div>
)
}