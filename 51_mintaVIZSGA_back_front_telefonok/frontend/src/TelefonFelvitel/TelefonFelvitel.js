import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";

const TelefonFelvitel = () => {
    const [markak, setMarkak] = useState([]);
    const [tolt, setTolt] = useState(true);
    const [hiba, setHiba] = useState(false);
    const [uzenet, setUzenet] = useState("");

    const [urlapAdatok, setUrlapAdatok] = useState({
        marka_id: "",
        modell: "",
        leiras: "",
        uj_ar: "",
        hasznalt_ar: "",
        kijelzo_merete: "",
        okostelefon: 1,
    });

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/markak");
                const data = await response.json();

                if (response.ok) {
                    setMarkak(data);

                    if (data.length > 0) {
                        setUrlapAdatok((prev) => ({
                            ...prev,
                            marka_id: data[0].marka_id,
                        }));
                    }

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

        leToltes();
    }, []);

    const adatValtozas = (e) => {
        const { name, value } = e.target;

        setUrlapAdatok((prev) => ({
            ...prev,
            [name]:
                name === "marka_id" || name === "okostelefon"
                    ? Number(value)
                    : value,
        }));
    };



    if (tolt) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2">Adatok betöltése...</p>
            </div>
        );
    }

    if (hiba) {
        return (
            <div className="alert alert-danger text-center">
                Hiba történt az adatok betöltésekor.
            </div>
        );
    }

    return (
        <div className="container my-4">
            <div className="card shadow-sm p-4">
                <h2 className="text-center mb-4">Telefon felvitele</h2>

                {uzenet && (
                    <div className="alert alert-info text-center">{uzenet}</div>
                )}

                <form>
                    <div className="mb-3">
                        <label className="form-label">Márka</label>
                        <select
                            className="form-select"
                            name="marka_id"
                            value={urlapAdatok.marka_id}
                            onChange={adatValtozas}
                            required
                        >
                            {markak.map((elem) => (
                                <option key={elem.marka_id} value={elem.marka_id}>
                                    {elem.marka_nev}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Modell</label>
                        <input
                            type="text"
                            className="form-control"
                            name="modell"
                            value={urlapAdatok.modell}
                            onChange={adatValtozas}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Leírás</label>
                        <textarea
                            className="form-control"
                            name="leiras"
                            rows="4"
                            value={urlapAdatok.leiras}
                            onChange={adatValtozas}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Új ár (Ft)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="uj_ar"
                            value={urlapAdatok.uj_ar}
                            onChange={adatValtozas}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Használt ár (Ft)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="hasznalt_ar"
                            value={urlapAdatok.hasznalt_ar}
                            onChange={adatValtozas}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Kijelző mérete (col)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="form-control"
                            name="kijelzo_merete"
                            value={urlapAdatok.kijelzo_merete}
                            onChange={adatValtozas}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Telefon típusa</label>
                        <select
                            className="form-select"
                            name="okostelefon"
                            value={urlapAdatok.okostelefon}
                            onChange={adatValtozas}
                        >
                            <option value={1}>Okostelefon</option>
                            <option value={0}>Nyomógombos telefon</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Telefon mentése
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TelefonFelvitel;