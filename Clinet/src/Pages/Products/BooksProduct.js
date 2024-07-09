
import { bookAPI} from "../../Constants";
import Product from "./Product";

export default function BooksProduct(){
    return(
        <div>
        
        <Product 
        prodApi={bookAPI.product}
        wishApi={bookAPI.wishlist}
        imageApi={bookAPI.image}
        name="Books Products"
        category="books"
        />
        
    </div>
    )
    
}