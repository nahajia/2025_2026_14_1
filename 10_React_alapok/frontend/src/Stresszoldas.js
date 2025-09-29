import { useState } from "react"
const Stresszoldas=()=>{
    const [nyugiSzam,setNyugiSzam]=useState(0)

    const novel=()=>{
        setNyugiSzam(nyugiSzam+1)
    }
    return (
        <div className="taplalkozas">
            <h2>Stresszoldás</h2>
            <button onClick={novel}>Nyugi Gomb (növel)</button>
            <button onClick={()=>setNyugiSzam(nyugiSzam-1)}>Nyugi gomb (csökkent)</button>
            <p>{nyugiSzam}</p>
        </div>
    )
}
export default Stresszoldas
