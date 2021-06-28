import { useEffect, useState } from "react";

function Cenik (props) {
    const [imeVozovnice, setImeVozovnice] = useState(null);
    const [ceneVozovnice, setCeneVozovnice] = useState({});

    useEffect(() => {
        let i = 1;
        setImeVozovnice(Object.keys(props.vozovnice)[0])
        setCeneVozovnice(props.vozovnice[Object.keys(props.vozovnice)[0]])

        const intervalCene = setInterval(() => {
            setImeVozovnice(Object.keys(props.vozovnice)[i])
            setCeneVozovnice(props.vozovnice[Object.keys(props.vozovnice)[i]])
            i++;
            if(i >= Object.keys(props.vozovnice).length) {
                i = 0;
            }
        }, 4000);

        return () => {
            clearInterval(intervalCene)
        }
    }, [])
    return (
        <div className='cenik'>
            <h3>{props.tip}</h3>
            <p>{imeVozovnice}</p>
            <table>
                {ceneVozovnice && Object.keys(ceneVozovnice).map(tip => (
                    <tr>
                        <th>{tip}</th>
                        <td>{ceneVozovnice[tip]} €</td>
                    </tr>
                ))}
    
            </table>
        </div>
    )
}
export default Cenik;