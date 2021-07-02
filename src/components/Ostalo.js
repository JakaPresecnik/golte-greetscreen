import { useEffect, useState } from 'react';
import Cenik from './Cenik';
import '../styles/ostalo.css';
import {cene} from '../template/cenik';

function Ostalo () {
    const [tipVozovnic, setTipVozovnic] = useState(0)
    
    const changeTip = () => {
        setTipVozovnic(tipVozovnic + 1);
    }

    return (
        <div className='ostalo'>
            <Cenik 
                tip={Object.keys(cene)[tipVozovnic]}
                changeTip={changeTip}
                vozovnice={cene[Object.keys(cene)[tipVozovnic]]}/>
        </div>
    )
}
export default Ostalo