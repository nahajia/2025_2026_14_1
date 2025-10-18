import { useState,useEffect } from "react"
import Cim from "./Cim"

const BejegyzesLista=()=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const leToltes=async ()=>{
        try{
            const response=await fetch(Cim.Cim+"bejegyzes")
            const data=await response.json()
            //alert(JSON.stringify(data))
            console.log(data)
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
        <div>
            <h2>Hírek a tenisz világából</h2>
            <div>
                {adatok.map((elem,index)=>(
                    <div key={index} className="kartya">
                        <span>{index+1}</span>
                        <div className="nev">{elem.jatekos_nev}</div>
                        <div className="szoveg">{elem.bejegyzes_szoveg}</div>
                        <div className="datum">Dátum: {elem.bejegyzes_datum.split("T")[0]}</div>
                        <div className="ki">Feltöltötte:{elem.bejegyzes_ki}</div>
                        

                        </div>
                ))}
            </div>
        </div>
    )
}
export default BejegyzesLista
