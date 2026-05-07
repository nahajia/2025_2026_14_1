import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/nyitolap">
          HúsvétiVersvilág
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Navigáció váltása"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/nyitolap">
                Húsvéti@Univerzum
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/versek">
                Versek
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/stilusTorles">
                Stílus törlés
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/keresCim">
                Keresés cím szerint
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/keresKedveles">
                Keresés kedvelés szerint
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/stilusFelvitel">
                Stílus felvitel
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/stilusModositas">
                Stílus módosítás
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;