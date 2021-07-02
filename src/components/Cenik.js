import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

function Cenik (props) {
    const [ceneVozovnice, setCeneVozovnice] = useState({});
    const [imeVozovnic, setImeVozovnic] = useState([])
    
    useEffect(() => {
        setCeneVozovnice(props.vozovnice[Object.keys(props.vozovnice)[0]]);
        setImeVozovnic(Object.keys(props.vozovnice));
    }, [props.vozovnice])

    const slide = keyframes`
        0% {top: 100%;}
        4% {top: 0%;}
        ${100 / imeVozovnic.length}% {top: 0%;}
        ${100 / imeVozovnic.length + 4}% {top: -100%;}
        100% {top: -100%;}
    `
    const autoplay2 = props => 
    css`
        ${imeVozovnic.length * 4}s ${slide} infinite ease-in-out
    `

    const Div = styled.div`
        position: absolute; 
        top: 100%; 
        left: 0;
        animation: ${autoplay2};
    `

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
                    <Div className='centerit' style={{animationDelay: 4 * i + 's'}}>
                        <p>{vozovnica}</p>

                        <table>
                            {ceneVozovnice && Object.keys(props.vozovnice[vozovnica]).map(tip => (
                                <tr>
                                    <th>{tip}</th>
                                    <td>{props.vozovnice[vozovnica][tip]} €</td>
                                </tr>
                            ))}
                
                        </table>
                    </Div>
                ))}
            </div>
        </div>
    )
}
export default Cenik;