import { useState } from "react"
import './reset.css'
import Button from "../../Components/Button"
import { UpdatePassword } from "../../Constants"
import axios from "axios"

export default function NewPassword(){

    
    const passRegex = /^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])/
    const [err, setErr] = useState(0);
    const [accept, setAccept] = useState(false);
    const [form,setForm]=useState({
        UserName:'',
        oldpassword:'',
        newpassword:''
    })
    
    function HandlChange(e){
        setForm({
            ...form,[e.target.name]:e.target.value
        })
    }

  async  function submit(e){
    let flag = true
    e.preventDefault();
    setAccept(true)

    if ( passRegex.test(form.cnewpassword) === false || passRegex.test(form.newpassword) === false || form.newpassword!==form.cnewpassword) {
        flag = false
    }
    else {
        flag = true
    }
   
        if (flag === true) {
            //send data

            await axios.put(UpdatePassword, {
                email: form.email,
                newPassword: form.newpassword,
                
            }, {
                headers: {
                    accept: '*',
                    'Content-Type': 'application/json-patch+json',
                }
            }).then(res=>{
                window.localStorage.clear();
                window.location.pathname="/logintype";
                console.log(res)
            }).catch(e=>console.log(err))
           
        }

    }



    return <div className="res-cont">
            <div>
            <h1>
    Reset Password
</h1>
            </div>

<div>
<img src={require("../../Assests/images/Password.png")}alt="" />
</div>
<div>
<form onSubmit={submit}>
                    
<label htmlFor="email">Enter your Email Address</label>
<input type="email" id='email' name='email' onChange={HandlChange} value={form.email} required />

<label htmlFor="newpassword">Enter your new password</label>
<input type="password" id='newpassword' name='newpassword'  onChange={HandlChange} value={form.newpassword} required />
<label htmlFor="cnewpassword">Confirm new password</label>
<input type="password" id='cnewpassword' name='cnewpassword'  onChange={HandlChange} value={form.cnewpassword} required />
                <Button name="Sign Up" />
                {passRegex.test(form.newpassword) === false && passRegex.test(form.cnewpassword) === false&& accept &&
                        <>
                            <p className="err">Password must have at least one non alphanumeric character</p>
                            <p className="err">Password must have at least one lowercase character </p>
                            <p className="err">Password must have at least one uppercase character </p>
                        </>
                    }
                    
            </form>
</div>
</div>


}