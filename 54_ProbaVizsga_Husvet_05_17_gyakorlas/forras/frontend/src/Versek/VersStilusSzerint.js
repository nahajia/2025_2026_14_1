import Cim from "../Cim";
function VersStilusSzerint({ adatok }) {
  if (adatok.length === 0) {
    return (
      <div className="alert alert-warning">Nincs megjeleníthető adat.</div>
    );
  }

  return (
    <div className="container my-4">
      {adatok.map((elem, index) => (
        <div key={index} className="card mb-4 shadow-sm">
          <div className="row g-0">
            <div className="col-md-3 text-center p-3">
              <img
                src={`${Cim.Cim}/kepek/${elem.locsolovers_id}.jpg`}
                alt={elem.cim}
                className="img-fluid rounded"
                style={{ maxHeight: "220px", objectFit: "cover" }}
              />
            </div>

            <div className="col-md-9">
              <div className="card-body">
                <h4 className="card-title">{elem.cim}</h4>

                <span className="badge bg-secondary mb-2">
                  {elem.stilus_nev}
                </span>

                <p className="card-text mt-2">{elem.vers}</p>

                <div className="mb-2">
                  <strong>Keletkezés éve:</strong> {elem.keletkezes_ev}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <strong>Kedvelések:</strong> {elem.kedvelesek_szama}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VersStilusSzerint;
