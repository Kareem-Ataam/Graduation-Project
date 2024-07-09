import { useState } from "react";
import { buyerOrSeller, sellerRegisterAPI } from "../../Constants";
//import ExternlLogin from "../../Components/ExternalLogin";
import './signup.css'
import Button from "../../Components/Button";
import axios from "axios";
import Foot from "../../Components/Foot";
import NavBar from "../../Components/NavBar";
import { Link } from "react-router-dom";

export default function SignUp(props) {
    
    // form elements
    const [form, setForm] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        shopName: '',
        email: '',
        governate: '',
        city: '',
        street: '',
        long: '',
        lat: '',
        password: '',

    });
    const [accept, setAccept] = useState(false);
    //const [flag,setFlag]=useState(false);
    const passRegex = /^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])/
    const [err, setErr] = useState(0)
    //set form elements
    function HandlChange(e) {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }
    async function register(e) {
        let flag = true
        e.preventDefault();
        setAccept(true);
        if (form.firstName === ''
            || form.lastName === ''
            || form.shopName === ''
            || form.governate === ''
            || form.city === ''
            || form.street === ''
            || form.long === ''
            || form.lat === ''
            || passRegex.test(form.password) === false
        ) {
            flag = false
        }
        else {
            flag = true
        }
        try {
            if (flag === true) {
                //send data

                let res = await axios.post(sellerRegisterAPI, {
                    "email": form.email,
                    "userName": form.userName,
                    "password": form.password,
                    "governate": form.governate,
                    "city": form.city,
                    "street": form.street,
                    "long": form.long,
                    "lat": form.lat,
                    "firstName": form.firstName,
                    "lastName": form.lastName,
                    "shopName": form.shopName
                }, {
                    headers: {
                        accept: 'text/plain',
                        'Content-Type': 'application/json',
                    }
                })
                if (res.status === 200) {
                    window.location.pathname='/login'
                    window.localStorage.setItem("email",form.email)
                }
            }


        }
        catch (e) {
            setErr(e.response.request.status)
            console.log(e)

        }
    }

    return <>
        <NavBar />
        <div className="signup-cont">

            <div className="frm">
                <form onSubmit={register}>

                    <label htmlFor="firstName">Enter your first name</label>
                    <input type="text" id='firstName' name='firstName' placeholder="first name" onChange={HandlChange} value={form.firstName} />
                    {form.firstName.length < 1 && accept && <p className="err">first name is required</p>}
                    
                    <label htmlFor="lastName">Enter your last name</label>
                    <input type="text" id='lastName' name='lastName' placeholder="last name" onChange={HandlChange} value={form.lastName} />
                    {form.lastName.length < 1 && accept && <p className="err">last name is required</p>}
                    
                    <label htmlFor="shopName">Enter your shop name</label>
                    <input type="text" id='shopName' name='shopName' placeholder="shop name" onChange={HandlChange} value={form.shopName} />
                    {form.shopName.length < 1 && accept && <p className="err">shop name is required</p>}
                    
                    <label htmlFor="email">Enter your email</label>
                    <input type="email" id='email' name='email' placeholder="email" onChange={HandlChange} value={form.email} required />
                    
                    <label htmlFor="userName">Enter your user name</label>
                    <input type="text" id='userName' name='userName' placeholder="user name" onChange={HandlChange} value={form.userName} required />

                    <label htmlFor="governate">Enter your governate</label>
                    <input type="text" id='governate' name='governate' placeholder=" governate" onChange={HandlChange} value={form.governate} />
                    {form.governate.length < 1 && accept && <p className="err">governate is required</p>}

                    <label htmlFor="city">Enter your city</label>
                    <input type="text" id='city' name='city' placeholder=" city" onChange={HandlChange} value={form.city} />
                    {form.city.length < 1 && accept && <p className="err">city is required</p>}

                    <label htmlFor="street">Enter your street</label>
                    <input type="text" id='street' name='street' placeholder="street" onChange={HandlChange} value={form.street} />
                    {form.street.length < 3 && accept && <p className="err">street is required</p>}

                    <label htmlFor="long">Enter your shop long</label>
                    <input type="text" id='long' name='long' placeholder="long" onChange={HandlChange} value={form.long} />
                    {form.long.length < 1 && accept && <p className="err">long is required</p>}

                    <label htmlFor="lat">Enter your shop lat</label>
                    <input type="text" id='lat' name='lat' placeholder="lat" onChange={HandlChange} value={form.lat} />
                    {form.lat.length < 3 && accept && <p className="err">lat is required </p>}



                    <label htmlFor="password">Enter your password</label>
                    <input type="password" id='password' name='password' placeholder="password" onChange={HandlChange} value={form.password} />
                    {passRegex.test(form.password) === false && accept &&
                        <>
                            <p className="err">Password must have at least one non alphanumeric character</p>
                            <p className="err">Password must have at least one lowercase character </p>
                            <p className="err">Password must have at least one uppercase character </p>
                        </>
                    }
                    
                    <Button name="Sign Up" />
                    {err === 500 && <p className="err " id="status" style={{ marginLeft: "20px" }}>Email/UserName has been already taken</p>}

                </form>
                <div className="bot">
                    <p className="sign-not">-OR-</p>

                    
                    {!buyerOrSeller ? <p className="sign-not">Already have an Account? <Link to="/logintype">Log in</Link></p> : <p className="sign-not">Already have an Account? <Link to="/login">Log in</Link></p>}
                </div>
            </div>


        </div>
        <Foot />
    </>
}
