import { useState } from "react";
import Swal from "sweetalert2";
import Cim from "../Cim";

function StilusFelvitel() {
    const [stilusNev, setStilusNev] = useState("");

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

                    <button className="btn btn-success" onClick={{}}>
                        Új stílus felvitele
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StilusFelvitel;