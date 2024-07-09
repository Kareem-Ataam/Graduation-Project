
import UpdatePost from "./UpdatePost";
import { fashionAPI } from "../../Constants";


export default function FashionUpdatePost(){
return(
    <div>
        
        <UpdatePost 
        prodApi={fashionAPI.product}
        name="Fashion Post Update"
        />
       
    </div>
)
}