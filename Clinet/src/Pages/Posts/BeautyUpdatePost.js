
import UpdatePost from "./UpdatePost";
import { beautyAPI } from "../../Constants";


export default function BeautyUpdatePost(){
return(
    <div>
        
        <UpdatePost
        prodApi={beautyAPI.product}
        name="Beauty Post Update"
        />
        
    </div>
)
}