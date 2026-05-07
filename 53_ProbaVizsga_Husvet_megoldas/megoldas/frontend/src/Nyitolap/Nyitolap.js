import { useState, useEffect } from "react";
import Cim from "../Cim";

const Nyitolap = () => {

  const [adatok, setAdatok] = useState([])
  const [hiba, setHiba] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${Cim.Cim}/locsoloversek`);

        if (!res.ok) {
          throw new Error("Hiba");
        }

        const data = await res.json();

        setAdatok(data);
        setHiba(false);

      } catch (err) {
        setHiba(true);
      }
    };

    fetchData();
  }, []);


  if (hiba) {
    return <div>Hiba</div>
  }

  return (
    <div>
      <h1 style={{textAlign: "center", margin: "10px"}}>Húsvéti locsolóversek</h1>

      <div className="row" style={{margin: "10px 100px"}}>
        {adatok.map((elem, index) => (
          <div className="card col-lg-4 col-sm-6 text-center p-2 mb-4">
            <img
              src={`http://localhost:3000/kepek/${index + 1}.jpg`}
              alt="húsvét"
              style={{ maxHeight: "180px", objectFit: "cover", borderRadius: "2px", }}
              className="img-fluid"
            />

            <div className="card-body">
              <h5 className="card-title">{elem.cim}</h5>
              <p className="card-text">
                <i>Stílus:</i> {elem.stilus_nev}
              </p>
              <p className="card-text">
                <i>Kedvelés:</i> {elem.kedvelesek_szama}
              </p>
            </div>

            <div className="card-footer">
              <div> <b>{elem.keletkezes_ev}</b> </div>
              <div> <b style={{fontSize: "larger", color:"blue"}}>{elem.kedvelesek_szama} Kedvelés</b> </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Nyitolap;
