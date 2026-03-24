
import { useState,useEffect } from "react"
import Cim from "../Cim"

const ErtekelesMegjelenit=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const leToltes=async ()=>{
        try{
            const response=await fetch(Cim.Cim+"/ertekeles")
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

    useEffect(()=>{
        leToltes()
    },[])

    if (tolt)
        return (
            <div style={{textAlign:"center"}}>Adatok betöltése folyamatban...</div>
                )
    else if (hiba)
        return (
            <div>Hiba</div>
                )       
    
    else return (
        <div className="row">
            {adatok.map((elem,index)=>(
                    <div className="col-sm-6 col-md-4 col-lg-3 border border-1 border-primary" key={index} value={elem.ertekeles_id}> 
                    <div>
                        Játék neve: {elem.jatek_nev}
                    </div>
                    <div>
                        Becenév: {elem.ertekeles_becenev}
                    </div>
                    <div>
                        Értékelési pon: {elem.ertekeles_pont}
                    </div>
                    <div>
                        Komment: {elem.ertekeles_komment}
                    </div>
                    <div>
                        Dátum: {elem.ertekeles_datum.split('T')[0]}
                    </div>
                     </div>
                ))}
        </div>
    )
}
export default ErtekelesMegjelenit
