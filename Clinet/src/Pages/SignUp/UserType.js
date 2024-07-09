import './signup.css'
import Foot from '../../Components/Foot'
import NavBar from '../../Components/NavBar'
import Button from "../../Components/Button";
import { buyerOrSeller} from '../../Constants';
import { useNavigate } from 'react-router-dom';
export default function UserType() {

    const router = useNavigate();
    //put the user type in local storage to link it with the form in signup page
    function UserChoose() {
        if (document.getElementById('1').checked)
        {
            window.localStorage.setItem('user type', 'buyer');
            router("/signupbuyer");
        }
        else if (document.getElementById('2').checked)
        {
            window.localStorage.setItem('user type', 'seller')
            router("/signupseller");
        }
    }

    return <>
    <NavBar />
    <div className="userType-con">
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
            <Button onClick={UserChoose} name="Sign Up" />
            {buyerOrSeller?  <div>
                Already have an account?<a href='/login'>log in</a>
            </div>:
            <div>
            Already have an account?<a href='/loginType'>log in</a>
        </div>
            }
            
        </div>
    </div>
<Foot/>
    </>


}