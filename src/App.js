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
import Obvestila from './components/Obvestila';
import Animated from './components/Animated';

function App() {
  const [proge, setProge] = useState(null);
  const [naprave, setNaprave] = useState(null);
  const [delujoceNaprave, setDelujoceNaprave] = useState(null);
  const [vremeARSO, setVremeARSO] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  const week = {0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat'}
  const d = new Date();
  const dan = week[d.getDay()];

  const changePic = (name) => {
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
    }
  }

  useEffect(() => {
    (async () => {
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
              setLoading(false)
          } catch(e) {
              console.log(e)
          }
      })();
      let count = 0;
      const interval = setInterval(() => {
        setActive(delujoceNaprave[count].name)
        count += 1;
        
        if(count === delujoceNaprave.length) {count = 0};
      }, 7000);
  }, [loading])

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
      <div className='left'><Naprave naprave={naprave} dan={dan} active={active} /></div>
      <div className='center'><Cajt dan={dan} naslov={delujoceNaprave.filter(n => n.name === active)} /></div>
      <div className='right'><Vreme arso={vremeARSO}/></div>
      <div className='bottom-center'><Obvestila obvestilo={delujoceNaprave.filter(n => n.name === active)}/></div>
      <div className='bottom'><div><img src={changePic(active)} /></div></div>
      <div className="animation-wrapper">
          <Animated />
      </div>
    </div>
  );
}

export default App;
