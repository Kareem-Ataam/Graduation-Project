import '../Components/components.css'
export default function Button(prop){

    return <div className="frm-btn">
                <button className="btn" type="submit" onClick={prop.onClick} >{prop.name}</button>
              </div>;
}