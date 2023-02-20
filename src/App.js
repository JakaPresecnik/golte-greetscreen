import './App.css';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Naprave from './components/Naprave';
import Cajt from './components/Cajt';
import Vreme from './components/Vreme';
import zekovec from './slike/žekovec.jpg'
import medvedjak from './slike/medvedjak.jpg'
import morava from './slike/morava.jpg'
import smrekovec from './slike/smrekovec.jpg'
import rocka from './slike/ročka.jpg'
import stariStani from './slike/stari_stani.jpg'
import golte from './slike/golte.jpg';
import progaMedvedjak from './slike/proga_medvedjak.jpg';
import progaStariStani from './slike/proga_stari_stani.jpg';
import progaBlatnik from './slike/proga_blatnik.jpg';
import Obvestila from './components/Obvestila';
import Animated from './components/Animated';
import Proge from './components/Proge';

function App() {
// spremenljivke za dobijanje podatkov iz api-jev
  const [proge, setProge] = useState(null);
  const [naprave, setNaprave] = useState(null);
  const [delujoceNaprave, setDelujoceNaprave] = useState(null);
  const [delujoceProge, setDelujoceProge] = useState(null);
  const [vremeARSO, setVremeARSO] = useState(null);
  const [loading, setLoading] = useState(true);
//spremenljivke za potrebe animacij
  const [levo, setLevo] = useState('naprave');
  const [active, setActive] = useState(0);
  const week = {0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat'}
  const d = new Date();
  const dan = week[d.getDay()];

  const changePic = (name, toggle) => {
    if(levo === 'naprave') {
      switch(name) {
        case 'Žekovec':
          return zekovec;
        case 'Medvedjak':
          return medvedjak;
        case 'Smrekovec':
          return smrekovec;
        case 'Stari Stani':
          return stariStani;
        case 'Ročka':
          return rocka;
        case 'Morava':
          return morava;
        default:
          return golte;
      }
    }else if(levo === 'proge') {
      switch(name) {
        case 'Medvedjak':
          return progaMedvedjak;
        case 'Blatnik':
          return progaBlatnik;
        case 'Stari Stani':
          return progaStariStani;
        default:
          return golte;
      }
    }
  }
  const getData = async () => {
    try {
      const proge = await fetch(`https://api.jpdum.com/Golte/slopes`)
      const progeData = await proge.json();
      const naprave = await fetch(`https://api.jpdum.com/Golte/lifts`)
      const napraveData = await naprave.json();
      const arso = await fetch('https://vreme.arso.gov.si/api/1.0/location/?lang=sl&location=Radegunda');
      const arsoData = await arso.json();

      setVremeARSO(arsoData.observation.features[0].properties.days[0].timeline[0]);
      setNaprave(napraveData)
      setProge(progeData)
      setDelujoceNaprave(napraveData.lifts.filter(lift => lift.working))
      setDelujoceProge(progeData.slopes.filter(slope => slope.working))
    } catch(e) {
        console.log(e)
    }
  }


  useEffect(() => {
    getData()
    .then(data => setLoading(false))
   // intervali za spremembe ki se odvijajo glede na čas
    let count = 0;
    let counting = 0;
    const int = setInterval(() => {

      if(levo === 'naprave') {
        if(count >= delujoceNaprave.length) {
          counting = 0
          setLevo('proge');
          setActive('Golte');        
        }else {
          setActive(delujoceNaprave[count].name)
          count += 1;
        }
      }
      if(levo === 'proge'){
        if(counting >= delujoceProge.length) {
          count = 0;   
          setLevo('naprave');  
          setActive('Golte');   
        }else {
          setActive(delujoceProge[counting].name)
          counting += 1;
        }
      }
    }, 7000);

    const intervalPodatki = setInterval(() => {
        getData()
    }, 900000);

    return () => {
      clearInterval(intervalPodatki)
      clearInterval(int)
    }
  }, [loading, levo])

  if(loading) {
    return (
        <div className='full-box'>
            <div className='loading'>
                <ReactLoading type={'spokes'} color={'#003763'} height={350} width={350} />
            </div>
        </div>
      )
  }
  
  return (
    <div className="App">
      <div className='left'>
        <Naprave levo={levo} naprave={naprave} dan={dan} active={active} />
        <Proge levo={levo} proge={proge} dan={dan} active={active} />
      </div>
      <div className='center'><Cajt dan={dan} naslov={
        levo === 'naprave' 
        ? delujoceNaprave.filter(n => n.name === active)
        : delujoceProge.filter(n => n.name === active)
      } /></div>
      <div className='right'><Vreme arso={vremeARSO}/></div>
      <div className='bottom-center'><Obvestila obvestilo={
          levo === 'naprave' 
          ? delujoceNaprave.filter(n => n.name === active)
          : delujoceProge.filter(n => n.name === active)
        } /></div>
      <div className='bottom'><div><img src={changePic(active, levo)} /></div></div>
      <div className="animation-wrapper">
          <Animated />
      </div>
      <audio id="RadioPlayer" type="audio/mpeg" autoPlay >
					<source src="https://live.radio.si/Fantasy" type="audio/mp3" />
		  </audio>
    </div>
  );
}

export default App;
