import { useState } from "react"
const Urlap=()=>{
    const [beSzoveg,setBeSzoveg]=useState("")
    const [beNev,setBeNev]=useState("")
    const [beDatum,setBeDatum]=useState("2025-10-16")  
    
    const felvitel=()=>{
        alert("meg lett nyomva")
    }

    return(
        <div >
            <input 
                type="text" 
                placeholder="Írd be a bejegyzést..."
                onChange={(e)=>setBeSzoveg(e.target.value)}
            />
            <br />
            <input 
                type="date" 
                onChange={(e)=>setBeDatum(e.target.value)}
                />
            <br />
            <input 
                type="text" 
                placeholder="Írd be a beceneved..."
                onChange={(e)=>setBeNev(e.target.value)}
            />
            <br />
            <button className="zoldGomb" onClick={felvitel}>Új bejegyzés felvitele</button>

            {/*
            A szöveg: {beSzoveg}
            A nev: {beNev}
            A datum: {beDatum}
            */}
        </div>
    )
}
export default Urlap

