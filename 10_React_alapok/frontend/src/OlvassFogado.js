
const OlvassFogado=({kCim,kIro,kMufaj,kHossz,kAr})=>{
    return (
        <div>
                <p style={{fontWeight:"bold"}}>A könyv részletes adatai:</p>

                <p>Könyv címe: {kCim}</p>
               
                <p>Könyv írója: {kIro}</p>
                <p>Könyv műfaja: {kMufaj}</p>
                <p>Könyv hossza: {kHossz}</p>
                <p>Könyv ára: {kAr}</p>

        </div>
    )
}
export default OlvassFogado
