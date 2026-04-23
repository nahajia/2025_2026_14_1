import { useEffect, useState } from "react";
import Cim from "../Cim";
import Lenyilo from "./Lenyilo";
import LenyiloStilus from "./LenyiloStilus";
import Modosit from "./Modosit";

function StilusModositas() {
  const [stilusok, setStilusok] = useState([]);
  const [kivalasztottId, setKivalasztottId] = useState("");
  const [ujNev, setUjNev] = useState("");
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

  const kivalasztottStilus = stilusok.find(
    (elem) => String(elem.stilus_id) === String(kivalasztottId),
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center my-4">Stílus módosítása</h2>

      {hiba && (
        <div className="alert alert-danger">
          Hiba történt az adatok lekérésekor.
        </div>
      )}

      <Lenyilo
        stilusok={stilusok}
        kivalasztottId={kivalasztottId}
        setKivalasztottId={setKivalasztottId}
      />

      {kivalasztottStilus && (
        <>
          <LenyiloStilus stilus={kivalasztottStilus} />
          <Modosit
            stilus={kivalasztottStilus}
            ujNev={ujNev}
            setUjNev={setUjNev}
          />
        </>
      )}
    </div>
  );
}

export default StilusModositas;
