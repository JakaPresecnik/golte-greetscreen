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

function App() {
  return (
    <div className="App">
      <div id="vsi-podatki"></div>
      <div className="background">
        <img src={images[1].default} />
        <img src={images[1].default} />
      </div>
      <img className="golte-logo" src={logo} />
      <Vreme />
      <Ostalo />
    </div>
  );
}

export default App;
