import { useState } from "react"
import SportFogado from "./SportFogado"
const SportKuldo=()=>{
    const [szeret,setSzeret]=useState("")
    const [szeret2,setSzeret2]=useState("")
    const [be,setBe]=useState("")
    return (
        <div>
            <h2>Sport</h2>
            <div className="sportKeret">
                <div className="sportDoboz">
                    <p>Kedvenc sportjaim:</p>
                    <ul>
                        <li>távolbanézés</li>
                        <li>ping-pong</li>
                        <li>{szeret}</li>
                        <li>{szeret2}</li>
                    </ul>

                    <p>Írd be a szót, amit átküldesz jobb oldalra:</p>
                    <input type="text" onChange={(e)=>setBe(e.target.value)}/>
                </div>
                <div className="sportDoboz">

                    <SportFogado 
                        nemSzeret="bungee jumping" 
                        be={be}

                        vissza={setSzeret}
                        vissza2={setSzeret2}
                        />
                </div>
            </div>
        </div>
    )
}
export default SportKuldo

