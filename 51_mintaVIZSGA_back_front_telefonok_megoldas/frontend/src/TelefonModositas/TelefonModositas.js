import { useState } from "react";
import LenyiloTelefon from "./LenyiloTelefon";
import Modosit from "./Modosit";

const TelefonModositas = () => {
    const [kivalasztott, setKivalasztott] = useState(1);
    const [talalat, setTalalat] = useState(false);

    const telefonKeres = () => {
        setTalalat(true);
    };

    return (
        <div>
            <div className="jatekCim">Telefon módosítása</div>

            <LenyiloTelefon setKivalasztott={setKivalasztott} />

            <button
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
                onClick={telefonKeres}
            >
                Telefon keresése
            </button>

            {talalat && <Modosit kivalasztott={kivalasztott} />}
        </div>
    );
};

export default TelefonModositas;