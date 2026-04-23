
import { useState } from "react"
import Cim from "../Cim"

const KommentKereses=()=>{
    const [beSzoveg,setBeSzoveg]=useState("")
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const keres=async ()=>{
        try{
            let bemenet={
                "szoveg":beSzoveg
            }
            const response=await fetch(Cim.Cim+"/kommentKereses",{
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
            <div className="cim">Kommentek közötti keresés</div>
            <div className="keretKeres">
             <input 
                type="text" 
                placeholder="Adj meg egy keresendő szót"
                style={{ width: "400px" }}
                onChange={(e)=>setBeSzoveg(e.target.value)}
            />
            <br />
            <button className="btn btn-primary mt-3 mb-3" onClick={keres}>Keresés</button>
            {adatok.map((elem,index)=>(
                    <div key={index} className="kommentMezo">
                        {elem.komment_szovege}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default KommentKereses;



