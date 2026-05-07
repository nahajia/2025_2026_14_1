import { useState } from "react";
import Swal from "sweetalert2";
import Cim from "../Cim";

function StilusFelvitel() {
    const [stilusNev, setStilusNev] = useState("");

    const StilusFelvitel = async () => {

        if (stilusNev === "" || stilusNev.length < 3 || stilusNev.length > 15) {
            alert("A stílus nevének megadása kötelező! Minimum 3, maximum 15 karakter lehet!");
            return;
        }

        const valasz = await Swal.fire({
            title: "Biztosan fel szeretné tölteni?",
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
            const response = await fetch(`${Cim.Cim}/stilusok`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    stilus_nev: stilusNev
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Hiba történt a felvitel során.");
                return;
            }

            alert("Sikeres módosítás!");
            window.location.reload();
        } catch (error) {
            alert("Hálózati hiba történt!");
        }


    }

    return (
        <div className="container mt-4">
            <h2 className="text-center my-4">Új stílus felvitele</h2>

            <div className="card shadow">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Stílus neve</label>
                        <input
                            type="text"
                            className="form-control"
                            value={stilusNev}
                            onChange={(e) => setStilusNev(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-success" onClick={StilusFelvitel}>
                        Új stílus felvitele
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StilusFelvitel;