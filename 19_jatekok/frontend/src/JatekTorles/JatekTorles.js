

import { useState,useEffect } from "react"
import Cim from "../Cim"

const JatekTorles=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const leToltes=async ()=>{
        try{
            const response=await fetch(Cim.Cim+"/jatek")
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
        <div>
                <table>
                {adatok.map((elem,index)=>(
                    <tr key={index} > 
                        <td>{elem.jatek_nev}</td>
                        <td>{elem.jatek_ar}</td>
                        <td>{elem.tipus_nev}</td>                                                
                    </tr>
                ))}
                </table>
        </div>
    )
}
export default JatekTorles


