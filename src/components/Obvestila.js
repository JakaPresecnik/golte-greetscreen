
function Obvestila (props) {
const {obvestilo} = props;

    if (obvestilo.length === 0) {
        return (
            <div className='loading'>
                
            </div>
        )
    }
    if (obvestilo[0].notes.length > 0) {
        return (
            <div>
                {obvestilo[0].notes.map(x => (
                    <p key={x}>{x}</p>
                ))}
            </div>
        )
    }
    
}
export default Obvestila;