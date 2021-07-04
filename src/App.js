import styled, { css, keyframes } from "styled-components";
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
  const slide = keyframes`
        0% {left: 100%}
        10% {left: 0%}
        ${100 / Object.keys(images).length}% {left: 0%}
        ${100 / Object.keys(images).length + 10}% {left: -100%}
        100% {left: -100%}
    `
    const autoplay3 = props => {

    return css`
        ${Object.keys(images).length * 10}s ${slide} infinite ease-in-out;
    `}
    const Img = styled.img`
        position: absolute;
        left: -100%;
        width: 100vw;
        animation: ${autoplay3};
    `
  return (
    <div className="App">
      <div id="vsi-podatki"></div>
      <div className="background">
        {Object.keys(images).map((img, i) => (
          <Img style={{animationDelay: 10 * i + 's'}} src={images[img].default} />
        ))}
      </div>
      <img className="golte-logo" src={logo} />
      <Vreme />
      <Ostalo />
    </div>
  );
}

export default App;
