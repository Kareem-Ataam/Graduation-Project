import UpdatePost from "./UpdatePost";
import { sportsAPI } from '../../Constants';


export default function SportsUpdatePost(){
return(
    <div>
        
        <UpdatePost
        prodApi={sportsAPI.product}
        name="Sports Post Update"
        />
       
    </div>
)
}