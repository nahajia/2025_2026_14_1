import { useState,useEffect } from "react"
const Chuck=()=>{
    const [adatok,SetAdatok]=useState("")

    const leTolt=async ()=>{
        let response=await fetch("https://api.chucknorris.io/jokes/random")
        let data=await response.json()
        SetAdatok(data)
    }

    useEffect(()=>{
        leTolt()
    },[])


    return(
        <div>
            <h3>Chuck Norris</h3>
            <div>
                {adatok.value}
                <br />
                <img src={adatok.icon_url} alt="Chuck" />
                <br />
                <a href={adatok.url}>Részletek</a>
            </div>
        </div>
    )
}
export default Chuck

