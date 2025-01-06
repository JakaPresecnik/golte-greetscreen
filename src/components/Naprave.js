import nihalka from '../icons/nihalka.png'
import vlecnica from '../icons/vlečnica.png'
import dvosedeznica from '../icons/dvosedežnica.png'
import trosedeznica from '../icons/trosedežnica.png'
import stirisedeznica from '../icons/štirisedežnica.png'

function Naprave(props) {
    const {naprave, dan, active, levo} = props;
    
    const tip = (t, c) => {
        switch(t) {
            case('vlečnica'):
                return vlecnica;
            case('nihalka'):
                return nihalka;
            case('sedežnica'):
                switch(c) {
                    case('2'):
                        return dvosedeznica;
                    case('3'):
                        return trosedeznica;
                    case('4'): 
                        return stirisedeznica;
                }
        }
    }

    return (
        <div className={`left-side ${levo === 'naprave' ? 'left-active' : 'left-inactive'}`}>
            <h2>Naprave:</h2>
            {naprave.lifts.map(naprava => (
                <div key={naprava.name} className={`naprava ${active === naprava.name ? "active" : ""}`} style={!naprava.working ? {backgroundColor: "#00366399"} : {}}>
                    <p>{naprava.id}</p>
                    <p>{naprava.name}</p>
                    {naprava.working ? (
                        <p>{naprava.working_hours[dan].open} - {naprava.working_hours[dan].close}</p>
                    ) : (
                        <p>NE OBRATUJE</p>
                    )}
                    <img className="ikona-naprave" src={tip(naprava.type, naprava.capacity)} />
                    {naprava.notes_count > 0 && (naprava.notes.map(note => (
                        <p key={note} className="notes">{note}</p>
                    )))}
                </div>  
            ))}
        </div>
    )
}

export default Naprave