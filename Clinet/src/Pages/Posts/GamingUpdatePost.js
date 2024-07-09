
import UpdatePost from "./UpdatePost";
import { gamingAPI } from "../../Constants";


export default function GamingUpdatePost(){
return(
    <div>
        
        <UpdatePost
        prodApi={gamingAPI.product}
        name="Gaming Post Update"
        />
        
    </div>
)
}