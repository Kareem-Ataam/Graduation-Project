import { sportsAPI, cusSearch } from "../../../Constants";
import CustomSearch from "./CustomSearch";

export default function SportsSearch(){
    return<>
    <h2>Sports Search Result</h2>
    <CustomSearch
    customApi={cusSearch.Sports}
    wishApi={sportsAPI.wishlist}
    />
    </>
}