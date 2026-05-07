import { useEffect, useState } from "react";
import Cim from "../Cim";
import VersStilusSzerint from "./VersStilusSzerint";
import Lenyilo from "./Lenyilo";

function Versek() {
  const [adatok, setAdatok] = useState([]);
  const [stilusok, setStilusok] = useState([]);
  const [kivalasztottStilus, setKivalasztottStilus] = useState("");
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

        const egyediStilusok = [
          ...new Set(data.map((elem) => elem.stilus_nev)),
        ];
        setStilusok(egyediStilusok);
      } catch (err) {
        setHiba(true);
      }
    };

    fetchData();
  }, []);

  const szurtAdatok =
    kivalasztottStilus === ""
      ? adatok
      : adatok.filter((elem) => elem.stilus_nev === kivalasztottStilus);

  return (
    <div className="container mt-4">
      <h2 className="text-center my-4">Locsolóversek stílus szerint</h2>

      <Lenyilo
        adatok={stilusok}
        kivalasztott={kivalasztottStilus}
        setKivalasztott={setKivalasztottStilus}
      />

      {hiba ? (
        <div className="alert alert-danger">
          Hiba történt az adatok lekérésekor.
        </div>
      ) : (
        <VersStilusSzerint adatok={szurtAdatok} />
      )}
    </div>
  );
}

export default Versek;
