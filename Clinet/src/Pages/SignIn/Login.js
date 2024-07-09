import { useState } from "react";
import { loginAPI } from "../../Constants";
import './login.css'
import Button from "../../Components/Button";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
    
    //form elements
    const [form, setForm] = useState({
        userName: '',
        password: '',
        email:''
    });

    const [accept,setAccept]=useState(false);
    const[flag,setFlag]=useState(true)

    //set the form values
    function HandlChange(e) {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }
   async function login(e){
        e.preventDefault()
        setAccept(true)
        try{
            let res= await axios.post(loginAPI,{
                "email": form.email,
                "password": form.password
          },{
            headers:{
                accept: 'text/plain' ,
                'Content-Type':'application/json-patch+json', 
            }
        });
        console.log(res)
        if(res.status===200){
            console.log(res)
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("email",form.email)
            window.localStorage.setItem("user",form.userName)
            window.location.pathname='/'
            
        }
        
        }
        catch (e){
          if(e.response.status===500){
            setFlag(false)
            
          }
        }
       
    
      
    }
    return <div className="login-cont">
       
        <div className="frm">
        <form onSubmit={login}>
        <label htmlFor="email">Enter your user email</label>
        <input type="email" id='email' name='email' placeholder="email" onChange={HandlChange} value={form.email} required />

        <label htmlFor="userName">Enter your user name</label>
                <input type="text" id='userName' name='userName' placeholder="User Name" onChange={HandlChange} value={form.userName} required />
                
              
                <label htmlFor="password">Enter your password</label>
                <input type="password"  id='password' name='password' placeholder="Password" onChange={HandlChange} value={form.password} required />
                
            <Button  name="Log In"/>
            {!flag && accept && <p className="err" id="status" style={{marginLeft:'20px'}}>Invalid username  or password</p>}
        </form>
        <div className="bot">
        <p className="not">Forgot Password? <Link to="/newpass">Get New Password</Link></p>
        <p className="log-not">-OR-</p>

        <p className="not">Don't have an Account? <Link to="/usertype">Sign Up</Link></p>
        </div>
        </div>
      
    </div>
   

   



}