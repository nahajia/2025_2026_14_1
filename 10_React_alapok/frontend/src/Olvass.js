import { useState } from "react"
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

const Olvass=()=>{
    const [kivalIndex,setkivalIndex]=useState(0)
    const [kivalCim,setKivalCim]=useState("")
    return (
        <div className="konyvDoboz">
            <h2>Olvass!!!</h2>
            <select name="" id="" onChange={(e)=>setkivalIndex(e.target.value)}>
                {konyvTomb.map((elem,index)=>(
                    <option value={index}>{elem.cim}</option>
                ))
                }
            </select>
            <p>Könyv címe: {konyvTomb[kivalIndex].cim}</p>
            <p>Könyv írója: {konyvTomb[kivalIndex].iro}</p>
            <p>Könyv műfaja: {konyvTomb[kivalIndex].mufaj}</p>
            <p>Könyv hossza: {konyvTomb[kivalIndex].hossz}</p>
            <p>Könyv ára: {konyvTomb[kivalIndex].ar}</p>
        </div>
    )
}
export default Olvass

