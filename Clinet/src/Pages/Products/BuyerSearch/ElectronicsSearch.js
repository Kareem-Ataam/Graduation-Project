import { electronicAPI, cusSearch } from "../../Constants";
import CustomSearch from "./CustomSearch";

export default function ElectronicsSearch(){
    return<>
    <h2>Books Search Result</h2>
    <CustomSearch
    customApi={cusSearch.Electronic}
    wishApi={electronicAPI.wishlist}
    />
    </>
}