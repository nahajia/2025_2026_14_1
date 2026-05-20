function LenyiloStilus({ stilus }) {
    return (
        <div className="alert alert-info">
            <strong>Kiválasztott stílus:</strong> {stilus.stilus_nev}
        </div>
    );
}

export default LenyiloStilus;