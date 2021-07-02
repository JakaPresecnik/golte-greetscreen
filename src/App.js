import Vreme from './components/Vreme'
import Ostalo from './components/Ostalo'
import './styles/helper.css'
import logo from './logo.png'

function importAllImages(r) {
  let images = {};
  r.keys().map((image, index) => { images[index] = r(image); });
  return images;
}
const images = importAllImages(require.context('./bcgr-img', false, /\.(png|jpe?g|svg)$/));
console.log(images[0])

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${images[0].default})`}}>
      <div id="vsi-podatki"></div>
      <img className="golte-logo" src={logo} />
      <Vreme />
      <Ostalo />
    </div>
  );
}

export default App;
