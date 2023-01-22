import { useState, useEffect } from "react";

function Cajt() {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const intervalCas = setInterval(() => {
            const d = new Date();
            const ura = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            const minuta = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            const sekunda = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

            setTime(ura + ':' + minuta + ':'  + sekunda)
        }, 1000);
    }, [])

    return (
        <p className="cas">{time}</p>
    )
}
export default Cajt;