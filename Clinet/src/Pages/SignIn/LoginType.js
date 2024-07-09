
import { brand } from "../../Constants"
import './login.css'
export default function LoginType() {
    

    //put the user type in local storage to link it with the form in signup page
    function UserChoose() {
        if (document.getElementById('1').checked)
            {
            window.localStorage.setItem('user type', 'buyer');
            window.location.pathname='/login'
            }
        else if (document.getElementById('2').checked){
            window.localStorage.setItem('user type', 'seller')
            window.location.pathname='/login'
        }
        }


    return <div className="logType-con">
        <h1>
            {brand}
        </h1>
        <div className="bdr">
            <div className="shape">
                <div className="custom-radio">
                    <input type="radio" name="user-type" id="1" value='buyer' />
                    <span className="rad" onClick={() => {
                        document.getElementById('1').checked = true
                    }}></span>
                </div>
                <div className="custom-image">
                    <label htmlFor="1">
                        <img src={require("../../Assests/images/buyer.png")} alt="buyer" />
                        <div>
                            <b>I am a buyer</b>
                        </div>
                    </label>
                </div>
            </div>
            <div className="shape">
                <div className="custom-radio">
                    <input type="radio" name="user-type" id="2" value='seller' />
                    <span className="rad" onClick={(e) => {
                        document.getElementById('2').checked = true
                    }}></span>
                </div>
                <div className="custom-image">
                    <label htmlFor="2">
                        <img src={require("../../Assests/images/seller.png")} alt="seller" />
                        <div>
                            <b>I am a seller</b>
                        </div>
                    </label>
                </div>

            </div>
        </div>

        <div className="last-section">
            <div className="btn" onClick={UserChoose}>
                <a href="/login" >Login</a>
            </div>
        </div>
    </div>




}