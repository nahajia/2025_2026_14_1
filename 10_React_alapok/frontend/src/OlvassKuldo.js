import { useState } from "react"
import OlvassFogado from "./OlvassFogado"
const konyvTomb=[
    {
        "cim":"Harry Potter 1.",
        "iro":"J.K. Rowling",
        "mufaj":"fantasy",
        "hossz":309,
        "ar":3000
    },
    {
        "cim":"Harry Potter 2.",
        "iro":"J.K. Rowling",
        "mufaj":"fantasy",
        "hossz":350,
        "ar":3500
    },   
    {
        "cim":"Alapítvány",
        "iro":"Asimov",
        "mufaj":"sci-fi",
        "hossz":360,
        "ar":2900
    }, 
    {
        "cim":"Dűne 1.",
        "iro":"Frank Herbert",
        "mufaj":"sci-fi",
        "hossz":450,
        "ar":3500
    },
    {
        "cim":"Digitális erőd",
        "iro":"Dan Brown",
        "mufaj":"thriller",
        "hossz":420,
        "ar":4000
    }
]

const OlvassKuldo=()=>{
    const [kivalIndex,setkivalIndex]=useState(0)
   
    return (
        <div className="konyvDoboz">
            <h2>Olvass!!!</h2>
            <div className="ketOszlop">
                <div className="oszlop"> 
                <p style={{fontWeight:"bold"}}>Válassz egy könyvet:</p>  
                <select name="" id="" onChange={(e)=>setkivalIndex(e.target.value)}>
                    {konyvTomb.map((elem,index)=>(
                        <option value={index}>{elem.cim}</option>
                    ))
                    }
                </select>
                </div>
                <div className="oszlop"> 
                    <OlvassFogado 
                        kCim={konyvTomb[kivalIndex].cim} 
                        kIro={konyvTomb[kivalIndex].iro} 
                        kMufaj={konyvTomb[kivalIndex].mufaj} 
                        kHossz={konyvTomb[kivalIndex].hossz} 
                        kIAr={konyvTomb[kivalIndex].ar} 

                    />

                </div>
            </div>
        </div>
    )
}
export default OlvassKuldo


