import { useEffect, useState } from "react";
import '../styles/vreme.css'

function importAllIcons(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const icons = importAllIcons(require.context('../icons', false, /\.(png|jpe?g|svg)$/));
const arsoURL = 'https://vreme.arso.gov.si/api/1.0/location/?lang=sl&location=Radegunda';
const arsoIconURL = 'https://vreme.arso.gov.si/app/common/images/svg/weather/';

function Vreme () {
    const [trenutneRazmere, setTrenutneRazmere] = useState('');
    const [loadingVreme, setLoadingVreme] = useState(true);
    const [time, setTime] = useState(null);

    const getWeather = async () => {
        const vreme = await fetch(arsoURL)
        const data = await vreme.json();

        console.log(data.observation.features[0].properties.days[0].timeline[0])

        setTrenutneRazmere(data.observation.features[0].properties.days[0].timeline[0]);
        setLoadingVreme(false)
    }

    useEffect(() => {
        getWeather()

        const intervalCas = setInterval(() => {
            const d = new Date();
            const ura = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            const minuta = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            const sekunda = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

            setTime(ura + ':' + minuta + ':' + sekunda)
        }, 1000);

        const intervalPodatki = setInterval(() => {
            getWeather()
        }, 1800000);

        return () => {
            clearInterval(intervalPodatki)
        }
    }, [])

    if(loadingVreme) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="vreme">
            <p className="cas">{time}</p>
            <p className="vir"><strong>VIR:</strong> ARSO Vremenska postaja Radegunda</p>
            <img className="vreme-ikona" src={arsoIconURL + trenutneRazmere.clouds_icon_wwsyn_icon + '.svg'} />
            <p><span>Temperatura:</span></p>
            <p className="temperatura">{trenutneRazmere.t} °C</p>
            <div className='veter'>
                <img src={icons[trenutneRazmere.dd_shortText + '.png'].default} />
                <div className='veter-text'>
                    <p><span>Veter: </span>{trenutneRazmere.ff_val} km/h</p>
                    <p><span>Vlažnost: </span>{trenutneRazmere.rh}%</p>
                </div>
            </div>
        </div>
    )
}


export default Vreme;
