import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cim from "../Cim";

function StilusTorles() {
  const [stilusok, setStilusok] = useState([]);
  const [kivalasztottId, setKivalasztottId] = useState("");
  const [hiba, setHiba] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${Cim.Cim}/stilusok`);

        if (!res.ok) {
          throw new Error("Hiba");
        }

        const data = await res.json();
        setStilusok(data);
        setHiba(false);
      } catch (err) {
        setHiba(true);
      }
    };

    fetchData();
  }, []);

  const torles = async () => {
    if (kivalasztottId === "") {
      alert("Válasszon ki egy stílust!");
      return;
    }

    const valasz = await Swal.fire({
      title: "Biztosan törölni szeretné?",
      text: "A művelet nem vonható vissza.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Igen",
      cancelButtonText: "Nem"
    });

    if (!valasz.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${Cim.Cim}/stilusok/${kivalasztottId}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Hiba történt a törlés során.");
        return;
      }

      alert("Sikeres törlés!");
      setStilusok(stilusok.filter((elem) => String(elem.stilus_id) !== String(kivalasztottId)));
      setKivalasztottId("");
    } catch (error) {
      alert("Hálózati hiba történt!");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center my-4">Stílus törlése</h2>

      {hiba && (
        <div className="alert alert-danger">
          Hiba történt az adatok lekérésekor.
        </div>
      )}

      <div className="card shadow">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Válasszon stílust</label>
            <select
              className="form-select"
              value={kivalasztottId}
              onChange={(e) => setKivalasztottId(e.target.value)}
            >
              <option value="">Kérem válasszon</option>
              {stilusok.map((elem) => (
                <option key={elem.stilus_id} value={elem.stilus_id}>
                  {elem.stilus_nev}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-danger" onClick={torles}>
            Törlés
          </button>
        </div>
      </div>
    </div>
  );
}

export default StilusTorles;