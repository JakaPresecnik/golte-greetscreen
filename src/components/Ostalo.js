import { useEffect, useState } from 'react';
import Cenik from './Cenik';
import '../styles/ostalo.css';
import {cene} from '../template/cenik';

function Ostalo () {
    const [tipiVozovnic, setTipiVozovnic] = useState([])
    
    return (
        <div className='ostalo'>
            {Object.keys(cene).map((tip, i) => (
                <Cenik 
                    tip={tip}
                    vozovnice={cene[Object.keys(cene)[i]]}/>
            ))}
        </div>
    )
}
export default Ostalo