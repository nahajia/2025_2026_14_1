
const SportFogado=({nemSzeret,vissza,be})=>{
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
        </div>
    )
}
export default SportFogado
