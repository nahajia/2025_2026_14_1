import { useState } from "react";
import Cim from "./Cim";

const Urlap = ({ frissit }) => {
    const [modell, setModell] = useState("");
    const [leiras, setLeiras] = useState("");
    const [ujAr, setUjAr] = useState("");
    const [hasznaltAr, setHasznaltAr] = useState("");
    const [kijelzo, setKijelzo] = useState("");
    const [markaId, setMarkaId] = useState("");
    const [okostelefon, setOkostelefon] = useState(1);
    const [siker, setSiker] = useState(" ");
    const [helyes, setHelyes] = useState(true);

    const felvitel = async () => {
        if (
            modell === "" ||
            leiras === "" ||
            ujAr === "" ||
            hasznaltAr === "" ||
            kijelzo === "" ||
            markaId === ""
        ) {
            setSiker("Minden mező kitöltése kötelező!");
            setHelyes(false);
            return;
        }

        const bemenet = {
            marka_id: Number(markaId),
            modell: modell,
            leiras: leiras,
            uj_ar: Number(ujAr),
            hasznalt_ar: Number(hasznaltAr),
            kijelzo_merete: Number(kijelzo),
            okostelefon: Number(okostelefon),
        };

        try {
            const response = await fetch(Cim.Cim + "/telefonFelvitel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bemenet),
            });

            const data = await response.json();

            if (response.ok) {
                setSiker(data["message"]);
                setHelyes(true);
                frissit((ertek) => !ertek);
            } else {
                setSiker(data["error"]);
                setHelyes(false);
            }
        } catch (error) {
            console.log(error);
            setSiker("Hiba történt a felvitel során.");
            setHelyes(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Írd be a modell nevét..."
                onChange={(e) => setModell(e.target.value)}
            />
            <br />

            <input
                type="text"
                placeholder="Írd be a leírást..."
                onChange={(e) => setLeiras(e.target.value)}
            />
            <br />

            <input
                type="number"
                placeholder="Írd be az új árat..."
                onChange={(e) => setUjAr(e.target.value)}
            />
            <br />

            <input
                type="number"
                placeholder="Írd be a használt árat..."
                onChange={(e) => setHasznaltAr(e.target.value)}
            />
            <br />

            <input
                type="number"
                step="0.1"
                placeholder="Írd be a kijelző méretét..."
                onChange={(e) => setKijelzo(e.target.value)}
            />
            <br />

            <input
                type="number"
                placeholder="Írd be a márka azonosítóját..."
                onChange={(e) => setMarkaId(e.target.value)}
            />
            <br />

            <select onChange={(e) => setOkostelefon(e.target.value)} value={okostelefon}>
                <option value={1}>Okostelefon</option>
                <option value={0}>Nyomógombos telefon</option>
            </select>
            <br />

            <button className="zoldGomb" onClick={felvitel}>
                Új telefon felvitele
            </button>

            {helyes ? (
                <div style={{ color: "green" }}>{siker} &nbsp;</div>
            ) : (
                <div style={{ color: "red" }}>{siker} &nbsp;</div>
            )}
        </div>
    );
};

export default Urlap;