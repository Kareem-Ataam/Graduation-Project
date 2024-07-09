import { buyerOrSeller, isToken } from '../Constants'
import NavBar from '../Components/NavBar'
import Foot from '../Components/Foot'
export default function Home() {

    return <div className='home-page'>
        <NavBar/>
{/* if there is a user and he/she seller show this header else show the other one*/ }
    {isToken && buyerOrSeller==='seller'? 

        <div className='hdr'>
           
            <div className='sell'>
            </div>

            <div className='lef'>
                <h1>
                    Upgrade Your Business
                </h1>
                <p>
Level up your business presence digitally
                </p>
            </div>
        </div>

        :  
        
        <div className='hdr' >


        <div className='buy'>
           
        </div>

        <div className='lef'>
            <h1>
Explore & Compare
            </h1>
            <p>
Explore diverse droducts, effortlessly compare prices from multiple retailers
            </p>
            </div>
        </div>
        }
<Foot/>

    </div>


}