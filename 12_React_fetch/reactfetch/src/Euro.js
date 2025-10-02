import { useState,useEffect } from "react"
const Euro=()=>{
    const [arfolyam,SetArfolyam]=useState(0)
    const [arfolyamusd,SetArfolyamUsd]=useState(0)
    const [arfolyamkinai,SetArfolyamKinai]=useState(0)

    useEffect(()=>{
        fetch("https://api.exchangerate-api.com/v4/latest/EUR")
        .then(response=>response.json())
        .then(data=>SetArfolyam(data.rates["HUF"]))

        fetch("https://api.exchangerate-api.com/v4/latest/usd")
        .then(response=>response.json())
        .then(data=>SetArfolyamUsd(data.rates["HUF"]))

        fetch("https://api.exchangerate-api.com/v4/latest/cny")
        .then(response=>response.json())
        .then(data=>SetArfolyamKinai(data.rates["HUF"]))
    },[])

    return (
        <div>
            <h3>Euró árfolyama</h3>
            <p>{arfolyam} Ft</p>
            <h3>Usa dollár árfolyama</h3>
            <p>{arfolyamusd} Ft</p>
            <h3>Kínai jüan árfolyama</h3>
            <p>{arfolyamkinai} Ft</p>
        </div>
    )
}
export default Euro
