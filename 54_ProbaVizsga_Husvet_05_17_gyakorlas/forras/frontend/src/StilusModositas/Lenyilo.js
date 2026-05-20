function Lenyilo({ stilusok, kivalasztottId, setKivalasztottId }) {
    return (
        <div className="mb-4">
            <label className="form-label">Válasszon módosítandó stílust:</label>
            <select
                className="form-select"
                value={kivalasztottId}
                onChange={(e) => setKivalasztottId(e.target.value)}
            >
                <option value="">Kérem válasszon</option>
                {stilusok.map((elem) => (
                    <option key={elem.stilus_id} value={elem.stilus_id}>
                        {elem.stilus_nev}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Lenyilo;