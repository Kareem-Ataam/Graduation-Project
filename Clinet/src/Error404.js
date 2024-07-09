import { Link } from "react-router-dom";

export default function  Error404(){
    return<div className="cont">
    <h1>404 Error Page</h1>

<section className="error-container">
  <span className="four"><span className="screen-reader-text">4</span></span>
  <span className="zero"><span className="screen-reader-text">0</span></span>
  <span className="four"><span className="screen-reader-text">4</span></span>
</section>
<div className="link-container">
  <Link  to='/' className="more-link">Return to home page</Link>
</div>
</div>
    
}