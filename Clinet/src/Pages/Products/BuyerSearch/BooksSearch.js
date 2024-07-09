import { bookAPI, cusSearch } from "../../Constants";
import CustomSearch from "./CustomSearch";

export default function BooksSearch(){
    return<>
    <h2>Books Search Result</h2>
    <CustomSearch
    customApi={cusSearch.Book}
    wishApi={bookAPI.wishlist}
    />
    </>
}