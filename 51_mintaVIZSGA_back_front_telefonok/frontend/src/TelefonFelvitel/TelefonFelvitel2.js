import { useState, useEffect } from "react";
import Cim from "../Cim";
import Swal from "sweetalert2";
import LenyiloMarka from "./LenyiloMarka";

const TelefonFelvitel2 = () => {
    const [tolt, setTolt] = useState(true);
    const [hiba, setHiba] = useState(false);
    const [siker, setSiker] = useState("");
    const [helyes, setHelyes] = useState(true);
    const [kivMarka, setKivMarka] = useState(1);
    const [modell, setModell] = useState("")
    const [leiras, setLeiras] = useState("")
    const [uj_ar, setUj_ar] = useState(0)
    const [hasznalt_ar, setHasznalt_ar] = useState(0)
    const [kijelzo_merete, setKijelzo_merete] = useState(0)
    const [okostelefon, setOkostelefon] = useState(1)


    const adatFelvitel = async (e) => {
        e.preventDefault();
        setSiker("")
        if(modell==""){
            alert("A telefon modelljének megadása kötelező!")
            return
        }
            
            const result = await Swal.fire({
              title: "Biztos hogy felakarod vinni az adatokat?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Igen, felvitel",
              cancelButtonText: "Mégse",
            });
        
            if (!result.isConfirmed) return;

        const bemenet = {
            marka_id: Number(kivMarka),
            modell: modell,
            leiras: leiras,
            uj_ar: Number(uj_ar),
            hasznalt_ar: Number(hasznalt_ar),
            kijelzo_merete: Number(kijelzo_merete),
            okostelefon: Number(okostelefon),
        };

        try {
            const response = await fetch(
                Cim.Cim + "/telefonFelvitel/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bemenet),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSiker(data["message"]);
                setHelyes(true);
            } else {
                setSiker(data["error"]);
                setHelyes(false);
            }
        } catch (error) {
            console.log(error);
            setHiba(true);
        }
    };

    useEffect(() => {}, []);




    return (
        <div className="felvitelDoboz">
            <form onSubmit={adatFelvitel}>

                <div className="mb-3">
                    Márka:
                    <LenyiloMarka ertek={kivMarka} setKivalasztott={setKivMarka} />
                </div>

                <div className="mb-3">
                    Modell:
                    <input
                        style={{ marginLeft: "30px" }}
                        className="inputD"
                        type="text"
                        value={modell}
                        onChange={(e) =>setModell(e.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    Leírás:
                    <textarea
                        style={{ marginLeft: "36px" }}
                        className="inputD"
                        type="text"
                        value={leiras}
                        onChange={(e) => setLeiras(e.target.value)
                        }
                    >
                    </textarea>
                </div>

                <div className="mb-3">
                    Új ár:
                    <input
                        style={{ marginLeft: "48px" }}
                        className="inputD"
                        type="number"
                        value={uj_ar}
                        onChange={(e) => setUj_ar(e.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    Használt ár:
                    <input
                        style={{ marginLeft: "10px" }}
                        className="inputD"
                        type="number"
                        value={hasznalt_ar}
                        onChange={(e) =>
                            setHasznalt_ar(e.target.value )
                        }
                    />
                </div>

                <div className="mb-3">
                    Kijelző mérete:
                    <input
                        style={{ marginLeft: "6px" }}
                        className="inputD"
                        type="number"
                        step="0.1"
                        value={kijelzo_merete}
                        onChange={(e) => setKijelzo_merete(e.target.value )
                        }
                    />
                </div>

                <div className="mb-3">
                    Típus:
                    <select
                        className="form-select"
                        value={okostelefon}
                        onChange={(e) =>setOkostelefon( Number(e.target.value))}
                    >
                        <option value={1}>Okostelefon</option>
                        <option value={0}>Nyomógombos telefon</option>
                    </select>
                </div>

                

                <div>
                    <button type="submit" className="btn btn-primary">
                        Felvitel
                    </button>

                    {helyes ? (
                        <div style={{ color: "green" }}>{siker}&nbsp;</div>
                    ) : (
                        <div style={{ color: "red" }}>{siker}&nbsp;</div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TelefonFelvitel2;