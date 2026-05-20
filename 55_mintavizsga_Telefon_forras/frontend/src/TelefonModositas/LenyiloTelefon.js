import { useState, useEffect } from "react";
import Cim from "../Cim";

const LenyiloTelefon = ({ setKivalasztott }) => {
    const [adatok, setAdatok] = useState([]);
    const [tolt, setTolt] = useState(true);
    const [hiba, setHiba] = useState(false);

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/telefonok");
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
        return <div>Hiba történt a telefonok betöltésekor.</div>;
    }

    return (
        <div>
            <select
                className="form-select"
                onChange={(e) => setKivalasztott(Number(e.target.value))}
            >
                {adatok.map((elem) => (
                    <option key={elem.telefon_id} value={elem.telefon_id}>
                        ID: {elem.telefon_id} - {elem.marka_nev ? elem.marka_nev : ""} {elem.modell}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LenyiloTelefon;