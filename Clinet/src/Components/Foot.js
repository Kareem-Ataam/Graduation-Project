import { brand } from "../Constants";
import {Link} from 'react-router-dom'

export default function Foot() {
    return ( <>
            <div className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Back to top
            </div>
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div>
                            
                            <h1><img src={require("../Assests/images/test.avif")} alt="logo" /> {brand}</h1>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Nulla facilis, saepe perferendis magni at et in praesentium adipisci ratione
                                inventore eligendi magnam illo voluptate officiis hic natus architecto suscipit nihil.
                            </p>

                            {/* <form className="footer-form">
                            <label htmlFor="eml"><b>Get Notifications by email</b></label>
                            <div className="input-container">
                                <input type="email" name="email" id="eml"  placeholder="Email"/>
                                <button type="submit"><i className="fa-solid fa-arrow-right-long"></i></button>
                            </div>
                            
                        </form> */}
                        </div>
                    </div>
                    <div className="footer-links">
                        <div className="footer-links-column">
                            <h2>Important Pages</h2>
                            <Link to="/">Help & Feedback</Link>
                            <Link to="/">Terms of Service</Link>
                            <Link to="/">Privacy Policy</Link>
                        </div>
                    </div>
                    
                </div>
                <div className="footer-bottom">
                    &copy;{brand} {new Date().getFullYear()}
                    <div className="social-icons">
                                <Link to="/"><i className="fa-brands fa-facebook"></i></Link>
                                <Link to="/"><i className="fa-brands fa-instagram"></i></Link>
                                <Link to="/"><i className="fa-brands fa-twitter"></i></Link>
                                <Link to="/"><i className="fa-brands fa-youtube"></i></Link>
                            </div>
                </div>
                
                
            </footer>
        </>
    );
}
