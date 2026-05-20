import { useState } from "react";
import Swal from "sweetalert2";
import Cim from "../Cim";

function StilusFelvitel() {
    const [stilusNev, setStilusNev] = useState("");

    const felvitel = async () => {
        if (stilusNev.trim() === "") {
            alert("Az új stílusnév megadása kötelező!");
            return;
        }

        const valasz = await Swal.fire({
            title: "Biztosan fel szeretnéd vinni az új stílust?",
            text: "Sikeres felvitel.",
            icon: "question",
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
                alert(data.message || "Hiba történt a módosítás során.");
                return;
            }

            alert("Sikeres módosítás!");
            window.location.reload();
        } catch (error) {
            alert("Hálózati hiba történt!");
        }
    };


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

                    <button className="btn btn-success" onClick={felvitel}>
                        Új stílus felvitele
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StilusFelvitel;