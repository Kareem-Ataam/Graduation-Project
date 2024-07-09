
import { fashionAPI, cusSearch } from "../../Constants";
import CustomSearch from "./CustomSearch";

export default function FashionSearch(){
    return<>
    <h2>Books Search Result</h2>
    <CustomSearch
    customApi={cusSearch.Fashion}
    wishApi={fashionAPI.wishlist}
    />
    </>
}