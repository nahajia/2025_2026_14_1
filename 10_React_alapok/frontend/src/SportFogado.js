
const SportFogado=({nemSzeret,be,vissza,vissza2})=>{
    return (
        <div>
            <p>Sportok amiket nem szeretek:</p>
            <ul>
                <li>futás</li>
                <li>foci</li>
                <li>{nemSzeret}</li>
                <li>{be}</li>
            </ul>
            <button onClick={()=>vissza("séta")}>Visszaküldés</button>
            <br />
            <p>Írd be a szót, amit átküldesz bal oldalra:</p>
            <input type="text" onChange={(e)=>vissza2(e.target.value)} />

        </div>
    )
}
export default SportFogado
