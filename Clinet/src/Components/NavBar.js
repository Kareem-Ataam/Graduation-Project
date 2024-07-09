import axios from "axios";
import { brand, isToken, logOutAPI } from "../Constants";
import { Link } from 'react-router-dom';
import { useState } from "react";

export default function NavBar() {
    const [que, setQue] = useState('');

    const openNav = () => {
        const nav = document.querySelector(".nav");
        const searchIcon = document.querySelector("#searchIcon");
        nav.classList.add("openNav");
        nav.classList.remove("openSearch");
        searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
    }

    const closeNav = () => {
        const nav = document.querySelector(".nav");
        nav.classList.remove("openNav");
    }

    const toggleSearch = () => {
        const nav = document.querySelector(".nav");
        const searchIcon = document.querySelector("#searchIcon");
        nav.classList.toggle("openSearch");
        nav.classList.remove("openNav");
        if (nav.classList.contains("openSearch")) {
            searchIcon.classList.replace("fa-magnifying-glass", "fa-xmark");
        } else {
            searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
        }
    }

    const logout = async () => {
        let res = await axios.get(logOutAPI);
        if (res.status === 204) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('user type');
            window.location.href = '/logintype';
        }
    }

    const handleChange = (event) => {
        setQue(event.target.value);
    }

    return (<>
        <nav className="nav">
            <i className="fa-solid fa-bars navOpenBtn" onClick={openNav}></i>
            <Link to="/" className="logo">{brand}</Link>

            <ul className="nav-links">
                <i className="fa-solid fa-xmark navCloseBtn" onClick={closeNav}></i>
                <li><Link to="/">Home</Link></li>

               
              {/*if there is a login user as a seller*/ }
                {isToken && <>
                    <li>
                                <div className="dropdown">
                                    <button className="dropbtn">Products
                                        {" "} <i className="fa fa-caret-down"></i>
                                    </button>
                                    <div className="dropdown-content">
                                        <Link to="/beauty-product">Beauty</Link>
                                        <Link to="/fashion-product">Fashion</Link>
                                        <Link to="/gaming-product">Gaming</Link>
                                        <Link to="/electronics-product">Electronics</Link>
                                        <Link to="/sports-product">Sports</Link>
                                        <Link to="/books-product">Books</Link>
                                    </div>
                                </div>
                            </li>
                    {window.localStorage.getItem('user type') === "seller" ?
                        <>
                            <li className="icon"><Link to="/createpost"> <span>Create Post</span></Link></li>
                            <li className="icon"><Link to={`/${window.localStorage.getItem('user')}`}> <i className="fa-solid fa-user"></i>{" "}<span>Profile</span></Link></li>
                            <li>
                                <div className="logout" onClick={logout}>
                                    <span>Log out</span> <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                </div>
                            </li>
                        </> :
                        <>
                            
                            <li className="icon"><Link to={`/${window.localStorage.getItem('user')}`}> <i className="fa-solid fa-user"></i>{" "}<span>Profile</span></Link></li>
                            <li className="icon"><Link to="/showwishlist"> <i className="fa-solid fa-cart-shopping"></i>{" "}<span>WishList</span></Link></li>
                            <li>
                                <div className="logout" onClick={logout}>
                                    <span>Log out</span> <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                </div>
                            </li>
                        </>
                    }
                </>}

                {!isToken && <li> <div className="join"><Link to="/userType">
                    Join Us
                </Link></div> </li>}
            </ul>

{isToken&&window.localStorage.getItem('user type')==='buyer'&&
<>
<i className="fa-solid fa-magnifying-glass search-icon" id="searchIcon" onClick={toggleSearch}></i>
            <div className="search-box">
                <i className="fa-solid fa-magnifying-glass search-icon" onClick={() => {
                    if (document.getElementById('query').value.length !== 0) {
                        const query = document.getElementById('query').value;
                        window.localStorage.setItem('global word', query);
                        window.location.pathname=`/search/${que}`
                    }
                }}></i>
                <input type="text" id="query" placeholder="Search here..." value={que} onChange={handleChange} />
            </div>

</>

}
         
        </nav>
<div className="mar-btm"></div>
        </>
    );
}
