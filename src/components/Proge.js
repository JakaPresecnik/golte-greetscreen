function Proge(props) {
    const {proge, active, levo} = props;
    
    const tezavnost = (t) => {
        switch(t) {
            case(1):
                return 'lahka';
            case(2):
                return 'tezka';
            case(3):
                return 'extremna';
        }
    }

    return (
        <div className={`left-side ${levo === 'proge' ? 'left-active' : 'left-inactive'}`}>
            <h2 className="proga-head">PROGE:</h2>
            {proge.slopes.map(proga => (
                <div key={proga.name} className={`proga ${active === proga.name ? "active" : ""}`} style={!proga.working ? {backgroundColor: "#00366399"} : {}}>
                    <p className={tezavnost(proga.difficulty)}>{proga.id}</p>
                    <p>{proga.name}</p>
                    {proga.working ? (
                        <p>ODPRTA</p>
                    ) : (
                        <p>ZAPRTA</p>
                    )}
                </div>  
            ))}
        </div>
    )
}
export default Proge;