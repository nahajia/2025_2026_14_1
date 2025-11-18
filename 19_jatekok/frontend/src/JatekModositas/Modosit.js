

import { useState,useEffect } from "react"
import Cim from "../Cim"

const Modosit=({kivalasztott})=>{

    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    
    const [egyJatek,setEgyJatek]=useState(null)

    const [siker,setSiker]=useState(" ")
    const [helyes,setHelyes]=useState(true)

    //adatok módosítása- jatekModosit backend végpont hívása
    const adatModosit=async (e)=>{
        e.preventDefault()

        const bemenet={
            "jatek_nev":egyJatek.jatek_nev

        }
        try{
        const response=await fetch(Cim.Cim+"/jatekModosit/"+kivalasztott,{
                method: "put",
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
        else{
            setSiker(data["error"])
            }
        }
        catch (error){
            console.log(error)

        }


    }



    useEffect(()=>{

    const leToltes=async ()=>{
        try{
            const response=await fetch(Cim.Cim+"/jatekEgy/"+kivalasztott)
            const data=await response.json()
            //alert(JSON.stringify(data))
            //console.log(data)
            if (response.ok)
                {
                    setEgyJatek(data[0])
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
        <div className="modositDoboz">

            <form onSubmit={adatModosit}>
            <div>
             <div style={{marginBottom:"10px",fontWeight:"bold"}}>Játék módosítása</div>   
             <span>Játék neve: </span>
             <input 
                type="text" 
                value={egyJatek.jatek_nev}
                onChange={(e)=>setEgyJatek({...egyJatek,jatek_nev:e.target.value})}
             />
             </div>
             <div>
             <button
                type="submit"
                className="btn btn-primary"
                >
                Módosítás
             </button>
             {helyes ? 
                <div style={{color:"green"}}>{siker} &nbsp;</div> 
                :  
                <div style={{color:"red"}}>{siker} &nbsp;</div> }
             </div>

            </form>


        </div>
    )
}
export default Modosit

