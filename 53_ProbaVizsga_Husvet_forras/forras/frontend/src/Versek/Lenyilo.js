function Lenyilo({ adatok, kivalasztott, setKivalasztott }) {
    return (
        <div className="mb-4">
            <label className="form-label">Válasszon stílust:</label>
            <select
                className="form-select"
                value={kivalasztott}
                onChange={(e) => setKivalasztott(e.target.value)}
            >
                <option value="">Összes stílus</option>
                {adatok.map((elem, index) => (
                    <option key={index} value={elem}>
                        {elem}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Lenyilo;