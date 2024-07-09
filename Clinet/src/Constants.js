
const token = window.localStorage.getItem('token');
export const brand='Market Navigator';
export const buyerOrSeller=window.localStorage.getItem('user type');
export const isToken=token?true:false;
export const logOutAPI='http://192.168.1.4:9000/api/Account/Logout';
export const sellerRegisterAPI="http://192.168.1.4:9000/api/Account/SellerRegiser";
export const buyerRegiserAPI="http://192.168.1.4:9000/api/Account/BuyerRegiser";
export const loginAPI="http://192.168.1.4:9000/api/Account/Login";
export const UpdatePassword="http://192.168.1.4:9000/api/Account/update-password"
export const sellerAPI=`http://192.168.1.4:9000/api/Seller`;
export const buyerAPI=`http://192.168.1.4:9000/api/Buyer`;
export const globSearch='http://192.168.1.4:9000/api/Search';
export const offlineApi='http://192.168.1.4:9000/api/OfflineSuggesion/GetSellerLocations'
export const onlineApi='http://192.168.1.4:9000/api/OnlineSuggestion'
export const cusSearch={Beauty:'http://192.168.1.4:9000/api/CustomSearchBasedOnCategory/Beauty',
    Fashion:'http://192.168.1.4:9000/api/CustomSearchBasedOnCategory/Fashion',
    Book:'http://192.168.1.4:9000/api/CustomSearchBasedOnCategory/Books',
    Electronic:'http://192.168.1.4:9000/api/CustomSearchBasedOnCategory/Electronics',
    Gaming:'http://192.168.1.4:9000/api/CustomSearchBasedOnCategory/Gaming',
    Sports:'http://192.168.1.4:9000/api/CustomSearchBasedOnCategory/Sports'
}
export const selleProductsAPI='http://192.168.1.4:9000/api/Seller/MyProducts';
export const buyerProductAPI='http://192.168.1.4:9000/api/Buyer/MyWishListProducts'
export const sportsAPI={product:"http://192.168.1.4:9000/api/SportsProducts",wishlist: "http://192.168.1.4:9000/api/SportsWishList",image:"http://192.168.1.4:9000/api/SportsProductImage"}
export const beautyAPI={product:"http://192.168.1.4:9000/api/BeautyProducts",wishlist: "http://192.168.1.4:9000/api/BeautyWishList",image:"http://192.168.1.4:9000/api/BeautyProductImage"}
export const bookAPI={product:"http://192.168.1.4:9000/api/BookProducts",wishlist: "http://192.168.1.4:9000/api/BooksWishlist",image:"http://192.168.1.4:9000/api/BookProductImage"}
export const electronicAPI={product:"http://192.168.1.4:9000/api/ElectronicsProduct",wishlist: "http://192.168.1.4:9000/api/ElectronicProductWishList",image:"http://192.168.1.4:9000/api/ElectronicProductImage"}
export const fashionAPI={product:"http://192.168.1.4:9000/api/FashionProduct",wishlist: "http://192.168.1.4:9000/api/FashionWishList",image:"http://192.168.1.4:9000/api/FashionProductImage"}
export const gamingAPI={product:"http://192.168.1.4:9000/api/GamingProduct",wishlist: "http://192.168.1.4:9000/api/GamingProductImage",image:"http://192.168.1.4:9000/api/GamingProductImage"}


