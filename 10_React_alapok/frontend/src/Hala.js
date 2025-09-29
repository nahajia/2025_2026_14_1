import { useState } from "react"
const halaTomb=["Egészség","Család","Barátok","Szerelem","Anyagi biztonság","Van munkám","Otthon","Tiszta környezet"]

const Hala=()=>{
    const [szoveg,setSzoveg]=useState("")
    const [szoveg2,setSzoveg2]=useState("")
    const [szam,setSzam]=useState(0)

    function valtoztat(e){
        setSzoveg(e.target.value)
    }


    return (

        <div className="taplalkozas">
            <h2>Hála</h2>
            <span>Írd be miért vagy hálás: </span>
            <input type="text" onChange={valtoztat} />
            <p>Ezért vagy hálás: {szoveg}</p>

            <span>Még egy dolgot írj, miért vagy hálás: </span>
            <input type="text" onChange={(e)=>setSzoveg2(e.target.value) } />
            <p>Ezért vagy hálás: {szoveg2}</p>

            <span>Adj meg egy számot: </span>
            <input type="number" value={szam} min={0} max={halaTomb.length-1}  onChange={(e)=>setSzam(e.target.value) } />
            {szam<halaTomb.length && szam>=0? 
                <p>Ezért vagy hálás: {halaTomb[szam]}</p>  
            : 
                <p>Nem jó érték</p>  
            }
           

        </div>
    )
}

export default Hala
