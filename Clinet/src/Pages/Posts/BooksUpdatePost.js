
import UpdatePost from "./UpdatePost";
import { bookAPI } from "../../Constants";


export default function BookUpdatePost(){
return(
    <div>
       
        <UpdatePost
        prodApi={bookAPI.product}
        name="Book Post Update"
        />
       
    </div>
)
}