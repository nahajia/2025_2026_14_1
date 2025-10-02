import { useState,useEffect } from "react"
const Euro=()=>{
    const [arfolyam,SetArfolyam]=useState(0)

    useEffect(()=>{
        fetch("https://api.exchangerate-api.com/v4/latest/EUR")
        .then(response=>response.json())
        .then(data=>SetArfolyam(data.rates["HUF"]))
    },[])

    return (
        <div>
            <h2>Euró árfolyama</h2>
            <p>{arfolyam} Ft</p>
        </div>
    )
}
export default Euro
