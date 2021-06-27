import { useEffect, useState } from "react";
import '../styles/vreme.css'

function importAllIcons(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const icons = importAllIcons(require.context('../icons', false, /\.(png|jpe?g|svg)$/));

function Vreme () {
    const [golteSkytech, setGolteSkytech] = useState({});
    const [mozirjeOpenWeather, setMozirjeOpenWeather] = useState('');
    const [loading, setLoading] = useState(true);

    const getData =  async () => {
        let data = {}
        const reqData = new FormData();
        reqData.append('c', 'tabela');

        const XHR = new XMLHttpRequest();
        XHR.addEventListener( 'load', function( event ) {
            // Response v DOM element
            let responseInHtml = document.getElementById('vsi-podatki');
            responseInHtml.innerHTML = event.target.responseText;

            // Iz DOM elementa poišči golte in shrani vse sledeče v konstante
            const golteHtml = Array.from(document.querySelectorAll('td'))
                .find(el => el.textContent === 'Golte');
            const hitrostVetraHtml = golteHtml.nextElementSibling;
            data.hitrostVetra = hitrostVetraHtml.textContent;
            const sunkiVetraHtml = hitrostVetraHtml.nextElementSibling;
            data.sunkiVetra = sunkiVetraHtml.textContent;
            const smerVetraHtml = sunkiVetraHtml.nextElementSibling;
            data.smerVetra = smerVetraHtml.textContent;
            const temperaturaHtml = smerVetraHtml.nextElementSibling;
            data.temperatura = temperaturaHtml.textContent;

            setGolteSkytech(data);
        } );

        XHR.open('POST', 'http://skytech.si/skytechsys/data.php');
        XHR.send(reqData)
    }

    const getWeather = async () => {
        const vreme = await fetch('//api.openweathermap.org/data/2.5/weather?q=Mozirje&appid=' + process.env.REACT_APP_API_KEY)
        const data = await vreme.json()
        setMozirjeOpenWeather(data.weather[0].icon)
        setLoading(false)
    }

    useEffect(() => {
        getWeather()
        getData()
    }, [])

    if(loading) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="vreme">
            <img className="vreme-ikona" src={icons[mozirjeOpenWeather + '.svg'].default} />
            <p><span>Temperatura:</span></p>
            <p className="temperatura">{golteSkytech.temperatura}</p>
            <div className='veter'>
                <img src={icons[golteSkytech.smerVetra + '.png'].default} />
                <div className='veter-text'>
                    <p><span>Veter: </span>{golteSkytech.hitrostVetra}</p>
                    <p><span>Sunki: </span>{golteSkytech.sunkiVetra}</p>
                </div>
            </div>
        </div>
    )
}


export default Vreme;