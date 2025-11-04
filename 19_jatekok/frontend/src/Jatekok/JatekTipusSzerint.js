

import { useState,useEffect } from "react"
import Cim from "../Cim"

const JatekTipusSzerint=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)



    useEffect(()=>{

    const leToltes=async ()=>{
        try{
            let bemenet={
                "tipus_id":kivalasztott
            }
            const response=await fetch(Cim.Cim+"/jatekKeresTip",{
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

        leToltes()
    },[kivalasztott])

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
                {kivalasztott}
                {adatok.map((elem,index)=>(
                    <div key={index} > {elem.jatek_nev} </div>
                ))}
           
        </div>
    )
}
export default JatekTipusSzerint

