import { useState } from "react";
import {  buyerOrSeller, buyerRegiserAPI } from "../../Constants";
import './signup.css'
import Button from "../../Components/Button";
import axios from "axios";
import { Link } from "react-router-dom";


export default function SignUp(props) {
   
    // form elements
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    });
   

    const passRegex = /^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])/
    const [err, setErr] = useState(0);
    const [accept, setAccept] = useState(false);
    //set form elements
    function HandlChange(e) {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }
    async function register(e) {
        let flag = true
        e.preventDefault();
        console.log("test")
        setAccept(true)

        if (form.firstName === ''
            || form.lastName === ''
            || passRegex.test(form.password) === false) {
            flag = false
        }
        else {
            flag = true
        }
        try {
            if (flag === true) {
                //send data

              let res=  await axios.post(buyerRegiserAPI, {
                    "email": form.email,
                    "userName": form.userName,
                    "password": form.password,
                    "firstName": form.firstName,
                    "lastName": form.lastName
                }, {
                    headers: {
                        accept: 'text/plain',
                        'Content-Type': 'application/json',
                    }
                });
                console.log(res)
                if(res.status===200)  
                {
                    window.location.pathname="/login";
                    window.localStorage.setItem("email",form.email)
                }

            }

        }
        catch (e) {
            setErr(e.response.request.status)
            console.log(e)

        }
    }
    return  <div className="signup-cont">
        <div className="frm">
            <form onSubmit={register}>
                    <label htmlFor="firstName">Enter your first name</label>
                    <input type="text" id='firstName' name='firstName' placeholder="first name" onChange={HandlChange} value={form.firstName} />
                    {form.firstName.length < 1 && accept && <p className="err">first name is required</p>}
                    <label htmlFor="lastName">Enter your last name</label>
                    <input type="text" id='lastName' name='lastName'placeholder="last name" onChange={HandlChange} value={form.lastName} />
                    {form.lastName.length < 1 && accept && <p className="err">last name is required</p>}
                    <label htmlFor="email">Enter your email</label>
                    <input type="email" id='email' name='email' placeholder="email" onChange={HandlChange} value={form.email} required />
                    <label htmlFor="userName">Enter your user name</label>
                    <input type="text" id='userName' name='userName' placeholder="user name" onChange={HandlChange} value={form.userName} required />
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
                {err === 500 && accept && <p className="err " id="status" style={{ marginLeft: "20px" }}>Email/UserName has been already taken</p>}
            </form>
            <div className="bot">
            <p className="sign-not">-OR-</p>

            {/*this part because if one user logout after register, may be its data removed from local storage , so it only for preventing*/}
            {!buyerOrSeller?<p className="sign-not">Already have an Account? <Link to="/logintype">Log in</Link></p>: <p className="sign-not">Already have an Account? <Link to="/login">Log in</Link></p> }
            </div>
        </div>

    </div>
    
}