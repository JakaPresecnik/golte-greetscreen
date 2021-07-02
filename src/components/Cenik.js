import { useEffect, useState } from "react";

function Cenik (props) {
    const [ceneVozovnice, setCeneVozovnice] = useState({});
    const [imeVozovnic, setImeVozovnic] = useState([])

    useEffect(() => {
        setCeneVozovnice(props.vozovnice[Object.keys(props.vozovnice)[0]]);
        setImeVozovnic(Object.keys(props.vozovnice));
    }, [props.vozovnice])

    return (
        <div className='cenik'>
            <h3>{props.tip}</h3>
            <div 
                style={{
                    animationDuration: imeVozovnic.length * 4 + 's'
                }}
                id="slideset2"
            >
                {imeVozovnic.map((vozovnica, i) => (
                    <div className='centerit' style={{
                        animationDuration: imeVozovnic.length * 4 +  's',
                        animationDelay: i * 4 + 's'
                        }} >
                        <p>{vozovnica}</p>

                        <table>
                            {ceneVozovnice && Object.keys(props.vozovnice[vozovnica]).map(tip => (
                                <tr>
                                    <th>{tip}</th>
                                    <td>{props.vozovnice[vozovnica][tip]} €</td>
                                </tr>
                            ))}
                
                        </table>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Cenik;