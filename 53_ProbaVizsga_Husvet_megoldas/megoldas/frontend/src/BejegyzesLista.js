function BejegyzesLista({ adatok }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>Azonosító</th>
                        <th>Cím</th>
                        <th>Vers</th>
                        <th>Év</th>
                        <th>Olvasási idő</th>
                        <th>Kedvelések</th>
                        <th>Stílus</th>
                    </tr>
                </thead>
                <tbody>
                    {adatok.map((elem) => (
                        <tr key={elem.locsolovers_id}>
                            <td>{elem.locsolovers_id}</td>
                            <td>{elem.cim}</td>
                            <td>{elem.vers}</td>
                            <td>{elem.keletkezes_ev}</td>
                            <td>{elem.olvasasi_ido_perc} perc</td>
                            <td>{elem.kedvelesek_szama}</td>
                            <td>{elem.stilus_nev}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BejegyzesLista;