const etelTomb=[
    {
        "nev":"tökfőzelék",
        "ido":20
    },
    {
        "nev":"borsófőzelék",
        "ido":20
    },
    {
        "nev":"húsleves",
        "ido":120
    }, 
    {
        "nev":"rakott karfiol",
        "ido":100
    }, 
    {
        "nev":"sült csirkecomb",
        "ido":60
    }, 
]


const Taplalkozas=()=>{
    return (
        <div className="taplalkozas">
            <h3 style={{textAlign:"center"}}>Táplálkozz egészségesen!!!</h3>
            <p style={{fontSize:20,color:"green",textAlign:"center"}}>Egyél sok gyümölcsöt és zöldséget!!!</p>
            <p style={{fontFamily:"serif",color:"orange",textAlign:"center"}}>Igyál sok vizet!!!</p>
            <p style={{fontStyle:"italic",textAlign:"center"}}> Egyél finom és egészséges ételeket, például:</p>
            <ul>
                { etelTomb.map(elem=>(
                    <li>{elem.nev} (elkészítési idő:{elem.ido})</li>
                ))}
            </ul>
            {/*ételek neve árnyékolt divekben */}
            <div id="doboz">
                { etelTomb.map(elem=>(
                    <div className="arnyekolt">{elem.nev}</div>
                ))}
            </div>
            <div>
                <p>Rövid idő alatt elkészíthető ételek:</p>
                {etelTomb.map(elem=>(
                    elem.ido<30?<p>{elem.nev} : {elem.ido}perc</p> :null
                ))}
            </div>
        </div>
    )
}

export default Taplalkozas

