import { useState, useEffect } from "react";
import { MdDownhillSkiing } from 'react-icons/md';
import logo from '../slike/logo.png';

function Cajt(props) {
    const [time, setTime] = useState(null);
    const {naslov, dan} = props;

    useEffect(() => {
        const intervalCas = setInterval(() => {
            const d = new Date();
            const ura = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            const minuta = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            const sekunda = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

            setTime(ura + ':' + minuta + ':'  + sekunda)
        }, 1000);
    }, [])

    const tezavnost = (t) => {
        switch(t) {
            case(1):
                return <p className='lahka ski'><MdDownhillSkiing className="shift" /></p>;
            case(2):
                return <p className='tezka ski rotiraj'><MdDownhillSkiing className="shift" /></p>;
            case(3):
                return <p className='extremna ski rotiraj-naprej'><MdDownhillSkiing className="shift" /></p>;
            default:
                return <p></p>
        }
    }    
    if (naslov.length === 0) {
        return (
            <div>
                <p className="cas">{time}</p>
                <img className="logo" src={logo} alt="logo" />
            </div>
        )
    }
    if(naslov[0].difficulty) {
        return (
            <div>
                <p className="cas">{time}</p>
                {tezavnost(naslov[0].difficulty)}
                <h3>{naslov[0].name}</h3>
                {naslov[0].snowmaking && <div className='top'></div>}
            </div>
        )
    }
    return (
        <div>
            <p className="cas">{time}</p>
            <p className="naslov">{naslov[0].type}</p>
            <h3>{naslov[0].name}</h3>
            <p className="naslov">{naslov[0].working_hours[dan].open} - {naslov[0].working_hours[dan].close}</p>
        </div>
    )
}
export default Cajt;