
import { useState } from "react"
import Cim from "../Cim"

const ErtekelesKereses=()=>{
    const [beSzoveg,setBeSzoveg]=useState("")
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const keres=async ()=>{
        try{
            let bemenet={
                "szoveg":beSzoveg
            }
            const response=await fetch(Cim.Cim+"/ertekelesKeresJatekNev",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bemenet)
            })
            const data=await response.json()
            //alert(JSON.stringify(data))
            //console.log(data)
            if (response.ok)
                {
                    setAdatok(data)
                    setTolt(false)}
            else 
                {
                    setHiba(true)
                    setTolt(false)
                }
            }
        catch (error){
            console.log(error)
            setHiba(true)
        }
        
    }

    return (
        <div>
            <div className="cim">Keresés játéknév alapján</div>
            <div className="border border-primary ertekKeret">
             <input 
                type="text" 
                placeholder="Add meg a játék nevét, vagy részletét."
                style={{ width: "400px" }}
                onChange={(e)=>setBeSzoveg(e.target.value)}
            />
            <br />
            <button className="btn btn-primary mt-3 mb-3" onClick={keres}>Keresés</button>
            <ul>
            {adatok.map((elem,index)=>(
                    <li key={index} >
                        <b>{elem.ertekeles_becenev}</b> - <i>{elem.ertekeles_komment}</i> - {elem.ertekeles_pont}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}
export default ErtekelesKereses;



