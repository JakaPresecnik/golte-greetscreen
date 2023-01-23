import snowflake from '../icons/snowflake.png'
import '../styles/animation.scss';

function Animated () {
    let snowflakes = [];
    for(let i = 0; i < 10; i ++) {
        snowflakes.push(i);
    }

    return (
        <div className="snowfall">
            {snowflakes.map((flake,i) => (<img key={'key' + i} src={snowflake} className="snowflake"/>))}
        </div>
    )
}

export default Animated;