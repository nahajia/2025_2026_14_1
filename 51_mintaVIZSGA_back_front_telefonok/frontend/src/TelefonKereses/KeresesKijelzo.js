import { useState } from "react";
import Cim from "../Cim";

const KeresKijelzo = () => {
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

    if (isNaN(beSzoveg)) {
      setAdatok({ error: "Adj meg egy számot" });
      setHiba(true);
      return;
    }

    setHiba(false);
    setTolt(true);
    setAdatok([]);

    try {
      const bemenet = {
        ertek: Number(beSzoveg),
      };

      const response = await fetch(Cim.Cim + "/telefonKeresKijelzo", {
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
      <div className="cim">Keresés kijelző mérete szerint</div>

      <div className="keretKeres">
        <input
          type="text"
          placeholder='Add meg legalább mekkora legyen a kijelző mérete...'
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
                {elem.marka_nev ? elem.marka_nev + " " : ""}
                {elem.modell} (
                kijelző: {elem.kijelzo_merete}", új ár: {elem.uj_ar} Ft,
                használt ár: {elem.hasznalt_ar} Ft)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default KeresKijelzo;