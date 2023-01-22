import { FaWind, FaTemperatureLow } from "react-icons/fa";


function Vreme(props) {
    const arsoUrl = 'https://vreme.arso.gov.si/app/common/images/svg/weather/';
    return (
        <div>
            <h2>Vreme:</h2>
        
        <div className="right-side">
            <div>
                <p><FaTemperatureLow /> {props.arso.t} °C</p>
                <p><FaWind /> {props.arso.ff_val} km/h</p>
            </div>
            <img alt='vreme' className="vreme-ikona" src={arsoUrl + props.arso.clouds_icon_wwsyn_icon + '.svg'} />
        </div>
        </div>
    )
}

export default Vreme;