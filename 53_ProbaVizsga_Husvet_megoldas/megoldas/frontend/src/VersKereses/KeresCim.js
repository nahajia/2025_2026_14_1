import { useState } from "react";
import Cim from "../Cim";

function KeresCim() {
  const [szoveg, setSzoveg] = useState("");
  const [hiba, setHiba] = useState(false);
  const [adatok, setAdatok] = useState([]);

  const keres = async () => {
    if (szoveg === "") {
      alert("A mező nem lehet üres!");
      return;
    }

    try {
      const response = await fetch(`${Cim.Cim}/keres/cim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          szoveg: szoveg
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

  if (hiba) {
    return <div>Hiba történt az adatok lekérésekor!</div>
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center my-4">Keresés Cím szerint</h2>

      <div
        className="p-4"
        style={{
          border: "2px solid blue",
          boxShadow: "8px 8px 0px rgba(0,0,255,0.3)"
        }}
      >
        <div className="mb-3">
          <label className="form-label">Cím vagy szórészlet</label>
          <input
            type="text"
            className="form-control"
            value={szoveg}
            placeholder="Add meg a keresendő szót..."
            onChange={(e) => setSzoveg(e.target.value)}
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
                      <i>{elem.cim}</i>
                    </b>
                  </u>
                </p>
                <p>
                    <i>Kedvelések száma: {elem.kedvelesek_szama}</i>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default KeresCim;