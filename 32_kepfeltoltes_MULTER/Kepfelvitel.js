import { useState } from 'react';
import Cim from '../Cim';

const Kepfelvitel = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

const felvitel = async () => {
        
        if (true) {

            const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a ....?`) 

            if (biztos) {
                //alert("ok")

                const formData = new FormData();
                        formData.append("film_cim", "aaaaaaaa");
                        formData.append("film_ev", 2010);
                        formData.append("kep", file); 

                        const response = await fetch(Cim.Cim + "/filmFelvitel", {
                            method: "POST",
                            body: formData 
                        });

                const data = await response.json()

                if (response.ok) {
                        alert("siker")
                } else {
                        alert("hiba")
                }
            }
            

        } else {
            alert("Minden adat megadása kötelező!");
        }
    }

  return (
    <div>
     


      <label
        htmlFor="kepInput"
        style={{
          display: 'inline-block',
          padding: '10px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '6px'
        }}
      >
        Kép tallózása
      </label>

      <input
        id="kepInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {file && (
        <div>
          <p>Kiválasztott fájl: {file.name}</p>
          {/* <img
            src={URL.createObjectURL(file)}
            alt="előnézet"
            style={{ width: '200px', marginTop: '10px' }}
          /> */}
        </div>
      )}


      <button type="button" class="btn btn-primary" onClick={() => felvitel()}>Új játék felvitele</button>

    </div>
  );
};

export default Kepfelvitel;
