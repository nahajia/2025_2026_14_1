import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/nyitolap">
          Telefonbolt
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/telefonok">
                Telefonok
              </Link>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button"
              >
                Keresés
              </button>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/KeresNev">
                    Keresés név szerint
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/keresKijelzo">
                    Keresés kijelző szerint
                  </Link>
                </li>
                
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button"
              >
                Admin funkciók
              </button>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/telefonFelvitel2">
                    Telefon felvitele2
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/telefonModositas">
                    Telefonok módosítása
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/telefonTorles">
                    Telefon törlése
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;