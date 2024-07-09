import { beautyAPI, cusSearch } from "../../Constants";
import CustomSearch from "./CustomSearch";

export default function BeautySearch(){
    return<>
    <h2>Beauty Search Result</h2>
    <CustomSearch
    customApi={cusSearch.Beauty}
    wishApi={beautyAPI.wishlist}
    />
    </>
}