import { useState } from 'react';
import './App.css';
import BejegyzesLista from './BejegyzesLista';
import Lenyilo from './Lenyilo';
import Urlap from './Urlap';


function App() {
  const [kivalasztott,setKivalasztott]=useState(1)
  return (
    <div >
      <h1>Tenisz hírek</h1>
      <div className="urlapDoboz">
          <h2>Felvitel</h2>
          <Lenyilo kivalasztott={setKivalasztott}/>
          {/*
          Kivalasztva: {kivalasztott}
          */}
          <Urlap atkuld={kivalasztott} />
      </div>
      <BejegyzesLista />
    </div>
  );
}

export default App;
