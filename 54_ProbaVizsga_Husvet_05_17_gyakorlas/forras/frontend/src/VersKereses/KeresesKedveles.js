import { useState } from "react";
import Cim from "../Cim";

function KeresesKedveles() {
  const [ertek, setErtek] = useState("");
  const [hiba, setHiba] = useState(false);
  const [adatok, setAdatok] = useState([]);

  const keres = async () => {
    if (ertek === "") {
      alert("A mező nem lehet üres!");
      return;
    }

    try {
      const response = await fetch(`${Cim.Cim}/keres/kedveles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ertek: Number(ertek)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setHiba(true);
        setAdatok([]);
        return;
      }

      setAdatok(data);
      setHiba(false);
    } catch (error) {
      setHiba(true);
      setAdatok([]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center my-4">Keresés kedvelés alapján</h2>

      <div
        className="p-4"
        style={{
          border: "2px solid blue",
          boxShadow: "8px 8px 0px rgba(0,0,255,0.3)"
        }}
      >
        <div className="mb-3">
          <label className="form-label">Minimum kedvelések száma</label>
          <input
            type="number"
            className="form-control"
            value={ertek}
            placeholder="Add meg a kedvelés számát..."
            onChange={(e) => setErtek(e.target.value)}
          />
        </div>

        <button className="btn btn-primary mb-3" onClick={keres}>
          Keresés
        </button>

        {hiba ? (
          <div className="alert alert-danger">
            Hiba történt a keresés során.
          </div>
        ) : (
          <ul>
            {adatok.map((elem) => (
              <li key={elem.locsolovers_id}>
                <p>
                  <u>
                    <b>
                      <i>{elem.cim} - {elem.kedvelesek_szama} kedvelés</i>
                    </b>
                  </u>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default KeresesKedveles;