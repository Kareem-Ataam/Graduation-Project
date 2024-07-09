
import UpdatePost from "./UpdatePost";
import { electronicAPI } from "../../Constants";


export default function ElectronicsUpdatePost(){
return(
    <div>
        
        <UpdatePost 
        prodApi={electronicAPI.product}
        name="Electronics Post Update"
        />
        
    </div>
)
}