import { Route, Routes } from "react-router-dom";
import UserType from "./Pages/SignUp/UserType";
import SignUpSeller from "./Pages/SignUp/SignUpSeller";
import SignUpBuyer from "./Pages/SignUp/SignUpBuyer";
import Login from "./Pages/SignIn/Login";
import LoginType from "./Pages/SignIn/LoginType";
import NewPassword from "./Pages/ForgotPassword/NewPassword";
import Home from "./Pages/Home";
import { buyerOrSeller, isToken } from "./Constants";
import CreatePost from './Pages/Posts/CreatePost.js'
import BeautyProduct from "./Pages/Products/BeautyProduct";
import BooksProduct from "./Pages/Products/BooksProduct";
import ElectronicsProduct from "./Pages/Products/ElectronicsProduct";
import FashionProduct from "./Pages/Products/FashionProduct";
import GamingProduct from "./Pages/Products/GamingProduct";
import SportsProduct from "./Pages/Products/SportsProduct";
import BeautyUpdatePost from "./Pages/Posts/BeautyUpdatePost.js";
import BooksUpdatePost from "./Pages/Posts/BooksUpdatePost.js";
import ElectronicsUpdatePost from "./Pages/Posts/ElectronicsUpdatePost.js";
import FashionUpdatePost from "./Pages/Posts/FashionUpdatePost.js";
import GamingUpdatePost from "./Pages/Posts/GamingUpdatePost.js";
import SportsUpdatePost from "./Pages/Posts/SportsUpdatePost.js";
import Profile from './Components/Profile.js'
import ShowWishList from "./Pages/Products/Wishlists/ShowWishList.js";
import GlobalSearchResult from "./Pages/Products/GlobalSearchResult.js";
import OfflineSearchResult from "./Pages/Products/OfflineSearchResult.js";
import OnlineSearch from "./Pages/Products/OnlineSearch.js";
import { AuthProvider } from "./Pages/ProtectPaths/Auth.js";
import NotAuthorized from './NotAuthorized.js'



export default function App() {
  return ( 
    <AuthProvider>
    <div className="App">
      <Routes>
        
        {!isToken && (
          <>
            <Route path='/usertype' element={<UserType/>}/>
            <Route path='/signupseller' element={<SignUpSeller/>}/>
            <Route path='/signupbuyer' element={<SignUpBuyer/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/newpass' element={<NewPassword/>}/>
            <Route path='/logintype' element={<LoginType/>}/>
            
            
          </>
        )}
        <Route path='/' element={<Home/>}/>
        
        <Route path='/beauty-product' element={<BeautyProduct/>}/>
        <Route path='/books-product' element={<BooksProduct/>}/>
        <Route path='/electronics-product' element={<ElectronicsProduct/>}/>
        <Route path='/fashion-product' element={<FashionProduct/>}/>
        <Route path='/gaming-product' element={<GamingProduct/>}/>
        <Route path='/sports-product' element={<SportsProduct/>}/>
        {buyerOrSeller==='seller'&&<>
          <Route path='/createpost' element={<CreatePost/>}/>
          <Route path='/beauty-update/:postId' element={<BeautyUpdatePost/>}/>
          <Route path='/fashion-update/:postId' element={<FashionUpdatePost/>}/>
          <Route path='/books-update/:postId' element={<BooksUpdatePost/>}/>
          <Route path='/sports-update/:postId' element={<SportsUpdatePost/>}/>
          <Route path='/electronics-update/:postId' element={<  ElectronicsUpdatePost/>}/>
          <Route path='/gaming-update/:postId' element={<GamingUpdatePost/>}/>
        </>}
        {buyerOrSeller==='buyer'&&<>
        <Route path="/showWishList" element={<ShowWishList/>}/>
        <Route path={`/search/:que`} element={<GlobalSearchResult/>}/>
        <Route path={'/offlinesearch'} element={<OfflineSearchResult/>}/>
        <Route path={'/onlineSearch'} element={<OnlineSearch/>}/>
        </>}
        
       
        <Route path={`/${window.localStorage.getItem('user')}`} element={<Profile/>}/>
        
        {/* 404 Page - Redirects to NotFound if no route matches */}
              <Route path='*' element={<NotAuthorized/>}/>
        

        
      </Routes>
      
    </div>
    </AuthProvider>
  );
}
