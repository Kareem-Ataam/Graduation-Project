import { gamingAPI, cusSearch } from "../../Constants";
import CustomSearch from "./CustomSearch";

export default function BeautySearch(){
    return<>
    <h2>Books Search Result</h2>
    <CustomSearch
    customApi={cusSearch.Gaming}
    wishApi={gamingAPI.wishlist}
    />
    </>
}