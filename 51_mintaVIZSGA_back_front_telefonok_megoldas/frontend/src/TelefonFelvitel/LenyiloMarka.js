import { useState, useEffect } from "react";
import Cim from "../Cim";

const LenyiloMarka = ({ ertek, setKivalasztott }) => {
    const [adatok, setAdatok] = useState([]);
    const [tolt, setTolt] = useState(true);
    const [hiba, setHiba] = useState(false);

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/markak");
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

    useEffect(() => {
        leToltes();
    }, []);

    if (tolt) {
        return (
            <div style={{ textAlign: "center" }}>
                Adatok betöltése folyamatban...
            </div>
        );
    }

    if (hiba) {
        return <div>Hiba történt a márkák betöltésekor.</div>;
    }

    return (
        <div>
            <select
                className="form-select"
                value={ertek}
                onChange={(e) => setKivalasztott(Number(e.target.value))}
            >
                {adatok.map((elem) => (
                    <option key={elem.marka_id} value={elem.marka_id}>
                        {elem.marka_nev}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LenyiloMarka;