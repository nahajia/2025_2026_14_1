import { useState,useEffect} from "react"
import toltesKep from "./toltes.gif"
const Nevnap=()=>{
    const [toltes,SetToltes]=useState(true)
    const [adatok,SetAdatok]=useState({})

    const letoltNevnap=async ()=>{
            let response=await fetch("https://api.nevnapok.eu/ma")
            let data=await response.json()
            SetAdatok(data["10-02"])
            SetToltes(false)
            //console.log(adatok)
            //alert(JSON.stringify(adatok))
           
    }

    useEffect(()=>{
        letoltNevnap()
    },[])


    if (toltes){
        return (
            <div>
                <p>Letöltés...</p>
                <img src={toltesKep} alt="töltés" />
            </div>
        )
    }
    else{
    return (
        <div>
            <h3>Névnapok</h3>
            <p>{adatok[0]}</p>
        </div>
    )
    }
}
export default Nevnap
