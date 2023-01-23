import { useState, useEffect } from "react";
import ReactLoading from 'react-loading';

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
    if (naslov.length === 0) {
        return (
            <div className='loading'>
                <ReactLoading type={'spokes'} color={'#003763'} height={350} width={350} />
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