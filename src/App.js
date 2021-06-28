import Vreme from './components/Vreme'
import Ostalo from './components/Ostalo'
import './styles/helper.css'
import logo from './logo.png'

function App() {
  return (
    <div className="App">
      <div id="vsi-podatki"></div>
      <img className="golte-logo" src={logo} />
      <Vreme />
      <Ostalo />
    </div>
  );
}

export default App;
