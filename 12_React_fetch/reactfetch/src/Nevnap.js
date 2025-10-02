import { useState,useEffect} from "react"
import toltesKep from "./toltes.gif"
const Nevnap=()=>{
    const [toltes,SetToltes]=useState(true)
    const [adatok,SetAdatok]=useState({})
    const [hiba,SetHiba]=useState(false)
    const [hibaSzoveg,SetHibaSzoveg]=useState("")


    const letoltNevnap=async ()=>{
        try{
            let response=await fetch("https://api.nevnapok.eu/ma")
            let data=await response.json()
            let ma=new Date().toISOString().slice(5,10)
            //alert(ma)
            SetAdatok(data[ma])
            SetToltes(false)
        }
        catch (error){
            SetHiba(true)
            SetHibaSzoveg(error)
        }
           
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
    if (hiba){
        return (
            <div>
                <p>Hiba</p>
                <p>{hibaSzoveg}</p>
            </div> 
        )       
    }
    else{
    return (
        <div>
            <h3>Névnapok</h3>
            {
                adatok.length>0 ? 
                <div>
                    {
                        adatok.map((elem,index)=>(
                            <p key={index}>{elem}</p>
                        ))
                    }
                </div>
                :
                <div>Nincs adat</div>
            }
        </div>
    )
    }
}
export default Nevnap
