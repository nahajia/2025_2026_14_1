import { useEffect, useState } from "react";
import Cim from "../Cim";
const Nyitolap = () => {
  const [adatok, setAdatok] = useState([]);
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

        // const egyediStilusok = [
        //   ...new Set(data.map((elem) => elem.stilus_nev)),
        // ];
        // setStilusok(egyediStilusok);
      } catch (err) {
        setHiba(true);
      }
    };

    fetchData();
  }, []);


  if (adatok.length === 0) {
    return (
      <div className="alert alert-warning">Nincs megjeleníthető adat.</div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="text-center">Húsvéti locsolóversek</h2>
      
      <div className="row">
      
      {adatok.map((elem, index) => (
        <div className="col-md-6 col-lg-4" >
        <div key={index} className="card mb-4 shadow-sm p-2">
          <div className="row g-0" >
            <div className="col-md-12 text-center p-3">
              <img
                src={`${Cim.Cim}/kepek/${elem.locsolovers_id}.jpg`}
                alt={elem.cim}
                className="img-fluid rounded"
                style={{ maxHeight: "180px", objectFit: "cover" }}
              />
            </div>

            <div className="col-md-12 text-center">
              <div className="card-body" >
                <h4 className="card-title">{elem.cim}</h4>

                {/* <span className="badge bg-secondary mb-2">
                  {elem.stilus_nev}
                </span> */}

                <p className="card-text mt-2" >{elem.vers}</p>

                <div className="mb-2">
                  <strong>Stílus:</strong> {elem.stilus_nev}
                </div>

                <div className="card-footer">
                
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <strong>{elem.keletkezes_ev}</strong> 
                  </div>
                  <div>
                     <b className="text-primary fs-5">{elem.kedvelesek_szama} kedvelés</b> 
                  </div>
                </div>

              </div>

              </div>
            </div>
          </div>
        </div>
      
       </div>
      ))}

    </div>

    </div>
  );



};

export default Nyitolap;
