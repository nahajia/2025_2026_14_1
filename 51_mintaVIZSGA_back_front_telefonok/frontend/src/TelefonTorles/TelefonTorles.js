import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cim from "../Cim";

const TelefonTorles = () => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [siker, setSiker] = useState(false);

  const leToltes = async () => {
    try {
      const response = await fetch(Cim.Cim + "/telefonok");
      const data = await response.json();

      if (response.ok) {
        setAdatok(data);
        setTolt(false);
      } else {
        setHiba(true);
        setTolt(false);
      }
    } catch (error) {
      console.log(error);
      setHiba(true);
      setTolt(false);
    }
  };

  useEffect(() => {
    leToltes();
  }, [siker]);

  const torlesFuggveny = async (telefon_id, modell) => {
    const result = await Swal.fire({
      title: "Biztos vagy benne?",
      text: `${modell} végleg törlésre kerül!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Igen, törlés",
      cancelButtonText: "Mégse",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        Cim.Cim + "/telefonTorles/" + telefon_id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          title: "Sikeres törlés",
          text: "A telefon törölve lett!",
          icon: "success",
        });
        setSiker((prev) => !prev);
      } else {
        Swal.fire({
          title: "Hiba",
          text: data.error,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Hiba",
        text: "Nem sikerült a szerverkapcsolat",
        icon: "error",
      });
    }
  };

  if (tolt) {
    return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>;
  }

  if (hiba) {
    return <div>Hiba</div>;
  }

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Márka</th>
            <th>Modell</th>
            <th>Új ár</th>
            <th>Használt ár</th>
            <th>Típus</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {adatok.map((elem, index) => (
            <tr key={index}>
              <td>{elem.marka_nev}</td>
              <td>{elem.modell}</td>
              <td>{elem.uj_ar} Ft</td>
              <td>{elem.hasznalt_ar} Ft</td>
              <td>{elem.okostelefon ? "Okostelefon" : "Nyomógombos telefon"}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => torlesFuggveny(elem.telefon_id, elem.modell)}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TelefonTorles;