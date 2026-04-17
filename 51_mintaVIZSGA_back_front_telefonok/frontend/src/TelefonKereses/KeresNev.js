import { useState } from "react";
import Cim from "../Cim";

const KeresNev = () => {
  const [beSzoveg, setBeSzoveg] = useState("");
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(false);
  const [hiba, setHiba] = useState(false);

  const keres = async () => {
    if (beSzoveg.trim() === "") {
      setAdatok({ error: "A mező nem lehet üres" });
      setHiba(true);
      return;
    }

   

    setHiba(false);
    setTolt(true);
    setAdatok([]);

    try {
      const bemenet = {
        szoveg: beSzoveg,
      };

      const response = await fetch(Cim.Cim + "/telefonKeresNev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bemenet),
      });

      const data = await response.json();

      if (response.ok) {
        setAdatok(data);
        setHiba(false);
      } else {
        setAdatok(data);
        setHiba(true);
      }

      setTolt(false);
    } catch (error) {
      console.log(error);
      setHiba(true);
      setTolt(false);
    }
  };

  return (
    <div>
      <div className="cim">Keresés név szerint</div>

      <div className="keretKeres border border-primary keretArnyek">
        <input
          type="text"
          placeholder='Add meg a keresendő szót...'
          style={{ width: "400px" }}
          onChange={(e) => setBeSzoveg(e.target.value)}
        />

        <br />

        <button className="btn btn-primary mb-3" onClick={keres}>
          Keresés
        </button>

        {tolt && (
          <div style={{ textAlign: "center" }}>
            Adatok betöltése folyamatban...
          </div>
        )}

        {hiba ? (
          <div className="text-danger">{adatok["error"]}</div>
        ) : (
          <ul>
            {adatok.map((elem, index) => (
              <li key={index}>
                
                <p style={{textDecoration:"underline"}}>{elem.marka_nev} {elem.modell} </p>
                <p><b>új ár:</b> <i>{elem.uj_ar} Ft</i>, <b>használt ár:</b> <i>{elem.hasznalt_ar} Ft</i></p>
                <p><b>kijelző mérete:</b> <i>{elem.kijelzo_merete}</i>, <b>tipus: </b>  
                <i>{elem.okostelefon===1 ? "Okostelefon" : "Buta telefon"}</i></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default KeresNev;