import Swal from "sweetalert2";
import Cim from "../Cim";

function Modosit({ stilus, ujNev, setUjNev }) {
    const modositas = async () => {
        if (ujNev.trim() === "") {
            alert("Az új stílusnév megadása kötelező!");
            return;
        }

        const valasz = await Swal.fire({
            title: "Biztosan módosítani szeretné?",
            text: "A stílus neve megváltozik.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Igen",
            cancelButtonText: "Nem"
        });

        if (!valasz.isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`${Cim.Cim}/stilusok/${stilus.stilus_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    stilus_nev: ujNev
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
        <div className="card shadow">
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Jelenlegi név</label>
                    <input
                        type="text"
                        className="form-control"
                        value={stilus.stilus_nev}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Új név</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ujNev}
                        onChange={(e) => setUjNev(e.target.value)}
                    />
                </div>

                <button className="btn btn-warning" onClick={modositas}>
                    Módosítás
                </button>
            </div>
        </div>
    );
}

export default Modosit;