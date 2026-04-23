import LenyiloJatek from "./LenyiloJatek"
import { useState } from 'react';
import Cim from "../Cim"

const KommentFelvitel=()=>{
    const [kivalasztott,setKivalasztott]=useState(1)
    const [becenev,setBecenev]=useState("")
    const [cim,setCim]=useState("")
    const [leiras,setLeiras]=useState("")
    const [datum,setDatum]=useState("")
    const [siker,setSiker]=useState(" ")
    const [helyes,setHelyes]=useState(true)

   const felvitel = async(e) => {
           
           if(becenev==="" || cim==="" || leiras==="" ){
            alert("A becenév a cím és a leírás megadása kötelező!")
            return
           }
           const biztos=window.confirm(`Biztosan hogy fel akarod vinni az adatokat?`)
           if (!biztos){
            return
           }
           const bemenet={
               "komment_jatek_id": kivalasztott,
               "komment_becenev": becenev,
               "komment_cime": cim,
               "komment_szovege": leiras,
               "komment_datum" : datum
           }
           try{
           const response=await fetch(Cim.Cim+"/kommentFelvitel",{
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
               alert("Sikeres felvitel")
               }
               
           else{
                setSiker(data["error"])
                alert("Hiba")
           }
               
           }
           catch (error){
               console.log(error)
   
           }
       
       }

    return(
        <div>
        <div>Felvitel</div>
        <LenyiloJatek kivalasztott={setKivalasztott}/>
        
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
                        Komment címe:
                            <input
                        style={{marginLeft:"30px"}}
                        className="inputD"
                        type="text"
                        onChange={(e) => setCim(e.target.value)}
                            />
                    </div>

                   <div>
                        Komment szövege:
                            <textarea
                        style={{marginLeft:"30px"}}
                        className="inputD"
                        rows={5}
                        cols={100}
                        onChange={(e) => setLeiras(e.target.value)}
                            >
                                </textarea>
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
                        onClick={()=>felvitel()}
                        >
                        Felvitel

                    </button>
                    
                </div>
        
        </div>
    )
}

export default KommentFelvitel