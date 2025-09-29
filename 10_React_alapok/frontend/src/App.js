import kep from "./kep.jpg"
import baross from "./baross.webp"
import './App.css';
import Uzenet from "./Uzenet";
import Keruld from "./Keruld";
import Taplalkozas from "./Taplalkozas";


const szemely={
  "nev":"Elgá Zoltán",
  "iskola":"Baross"
}

function Nevjegy(){
    return (
      <div>
        <p>Készítette: {szemely.nev}</p>
        <p>{szemely.iskola}</p>
        <img src={baross} alt="Baross" />
      </div>
    )
}

function Utazas(){
  return (
    <div className="keretUtazas">
      <p>Utazz el például ide:</p>
      <ul>
        <li>Olaszország</li>
        <li>Spanyolország</li>
        <li>Görögország</li>
      </ul>
    </div>
  )
}

const Konyv=()=>{
  return(
    <div className="keretUtazas keretZold">
      <p>Olvass könyveket, például ezeket:</p>
      <ul>
        <li>Harry Potter</li>
        <li>Gyűrűk ura</li>
        <li>Dan Brown könyvek</li>
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Élj boldogan!</h1>
      <h2>Pozitív gondolatok a boldog élethez!!!</h2>
      <img src={kep} alt="Smiley" className="kepkinezet"/>

      <Taplalkozas />
      <Uzenet />
      <Keruld />
      <Konyv />
      <Utazas />
      <Nevjegy />
    </div>
    
  );
}

export default App;
