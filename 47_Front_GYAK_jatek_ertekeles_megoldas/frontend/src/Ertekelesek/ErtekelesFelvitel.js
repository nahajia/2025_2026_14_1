import LenyiloJatek from "./LenyiloJatek"
import { useState } from 'react';
import Cim from "../Cim"

const ErtekelesFelvitel=()=>{
    const [kivalasztott,setKivalasztott]=useState(1)
    const [becenev,setBecenev]=useState("")
    const [pont,setPont]=useState(0)
    const [komment,setKomment]=useState("")
    const [datum,setDatum]=useState("")
    const [siker,setSiker]=useState(" ")
    const [helyes,setHelyes]=useState(true)

    const adatFelvitel = async(e) => {
            e.preventDefault()
            //alert(kivalasztott)
            const bemenet={
                "ertekeles_game_id": kivalasztott,
                "ertekeles_becenev": becenev,
                "ertekeles_pont": pont,
                "ertekeles_komment": komment,
                "ertekeles_datum" : datum
            }
            try{
            const response=await fetch(Cim.Cim+"/ertekelesFelvitel/",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bemenet)
                })
            const data=await response.json()
            //alert(JSON.stringify(data))
            if (response.ok){
                setSiker(data["message"])
                setHelyes(true)
                }
                
            else
                setSiker(data["error"])
            }
            catch (error){
                console.log(error)
    
            }
        
        }
    return(
        <div>
        <div>Felvitel</div>
        <LenyiloJatek kivalasztott={setKivalasztott}/>
        <form onSubmit={adatFelvitel}>
                <div>
                    <div>
                        Becenév:
                            <input
                        style={{marginLeft:"30px"}}
                        className="inputD"
                        type="text"
                        onChange={(e) => setBecenev(e.target.value)}
                            />
                    </div>

                    <div>
                        Pont:
                            <input
                        style={{marginLeft:"30px"}}
                        className="inputD"
                        type="number"
                        min={0}
                        max={10}
                        onChange={(e) => setPont(e.target.value)}
                            />
                    </div>

                    <div>
                        Komment:
                            <input
                        style={{marginLeft:"30px"}}
                        className="inputD"
                        type="text"
                        onChange={(e) => setKomment(e.target.value)}
                            />
                    </div>

                    <div>
                        Dátum:
                            <input
                        style={{marginLeft:"30px"}}
                        className="inputD"
                        type="text"
                        onChange={(e) => setDatum(e.target.value)}
                            />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        >
                        Felvitel
                    </button>
                </div>
        </form>
        </div>
    )
}

export default ErtekelesFelvitel