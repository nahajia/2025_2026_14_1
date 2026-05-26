import { useState, useEffect } from "react";
import Cim from "./Cim";

const BejegyzesLista = ({ frissit }) => {
    const [adatok, setAdatok] = useState([]);
    const [tolt, setTolt] = useState(true);
    const [hiba, setHiba] = useState(false);
    const [rendezes, setRendezes] = useState(0);

    const novekvoKattint = () => {
        setRendezes(0);
    };

    const csokkenoKattint = () => {
        setRendezes(1);
    };

    const leToltes = async () => {
        try {
            let response = [];

            if (rendezes === 0) {
                response = await fetch(Cim.Cim + "/telefonok");
            } else if (rendezes === 1) {
                response = await fetch(Cim.Cim + "/telefonokCsokk");
            }

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
    }, [frissit, rendezes]);

    if (tolt) {
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>;
    } else if (hiba) {
        return <div>Hiba</div>;
    } else {
        return (
            <div>
                <h2>Telefon kínálat</h2>

                <div style={{ textAlign: "center" }}>
                    <img
                        onClick={novekvoKattint}
                        className="gombok"
                        src="/down.jpg"
                        alt="növekvőbe rendezés"
                    />
                    <img
                        onClick={csokkenoKattint}
                        className="gombok"
                        src="/up.jpg"
                        alt="csökkenőbe rendezés"
                    />
                </div>

                <div>
                    {adatok.map((elem, index) => (
                        <div key={index} className="kartya">
                            <span>{index + 1}</span>
                            <div className="nev">
                                {elem.marka_nev ? elem.marka_nev + " " : ""}
                                {elem.modell}
                            </div>
                            <div className="szoveg">{elem.leiras}</div>
                            <div className="datum">Kijelző mérete: {elem.kijelzo_merete}"</div>
                            <div className="ki">
                                Típus: {elem.okostelefon ? "Okostelefon" : "Nyomógombos telefon"}
                            </div>
                            <div className="ki">Új ár: {elem.uj_ar} Ft</div>
                            <div className="ki">Használt ár: {elem.hasznalt_ar} Ft</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default BejegyzesLista;