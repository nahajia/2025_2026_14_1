import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";

const TelefonTipusSzerint = ({ kivalasztott }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);

  useEffect(() => {
    const leToltes = async () => {
      try {
        setTolt(true);
        setHiba(false);

        const bemenet = {
          marka_id: kivalasztott
        };

        const response = await fetch(Cim.Cim + "/telefonokMarkaSzerint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bemenet)
        });

        const data = await response.json();

        if (response.ok) {
          setAdatok(data);
          setTolt(false);
        } else {
          setHiba(true);
          setTolt(false);
        }
      } catch (error) {
        console.log(error);
        setHiba(true);
        setTolt(false);
      }
    };

    leToltes();
  }, [kivalasztott]);

  if (tolt) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Adatok betöltése...</p>
      </div>
    );
  }

  if (hiba) {
    return (
      <div className="alert alert-danger text-center">
        Hiba történt az adatok betöltésekor
      </div>
    );
  }

  return (
    <div className="container my-4">
      {adatok.map((elem, index) => (
        <div key={index} className="card mb-4 shadow-sm">
          <div className="row g-0">
            <div className="col-md-3 text-center p-3">
              <img
                src={`${Cim.Cim}/kepek/${elem.telefon_id}.jpg`}
                alt={elem.modell}
                className="img-fluid rounded"
                style={{ maxHeight: "180px", objectFit: "cover" }}
              />
            </div>

            <div className="col-md-9">
              <div className="card-body">
                <h4 className="card-title">
                  {elem.marka_nev ? `${elem.marka_nev} ${elem.modell}` : elem.modell}
                </h4>

                <span className="badge bg-secondary mb-2">
                  {elem.okostelefon ? "Okostelefon" : "Nyomógombos telefon"}
                </span>

                <p className="card-text mt-2">
                  {elem.leiras}
                </p>

                <div className="mb-2">
                  <strong>Kijelző mérete:</strong> {elem.kijelzo_merete}"
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <strong>Új ár:</strong> {elem.uj_ar} Ft
                  </div>
                  <div className="fw-bold text-primary fs-5">
                    <strong>Használt ár:</strong> {elem.hasznalt_ar} Ft
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TelefonTipusSzerint;