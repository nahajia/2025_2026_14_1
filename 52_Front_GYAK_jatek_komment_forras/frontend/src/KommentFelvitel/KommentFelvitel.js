import LenyiloJatek from "./LenyiloJatek"
import { useState } from 'react';
import Cim from "../Cim"

const KommentFelvitel=()=>{
    const [kivalasztott,setKivalasztott]=useState(1)
    const [becenev,setBecenev]=useState("")
    
    const [siker,setSiker]=useState(" ")
    const [helyes,setHelyes]=useState(true)

   
    return(
        <div>
        <div>Felvitel</div>
        <LenyiloJatek kivalasztott={setKivalasztott}/>
        
                <div>
                    <div>
                        Becenév:
                            <input
                        style={{marginLeft:"30px"}}
                        className="inputD"
                        type="text"
                        onChange={(e) => setBecenev(e.target.value)}
                            />
                    </div>

                    

                   

                   

                    <button
                        type="submit"
                        className="btn btn-primary"
                        >
                        Felvitel
                    </button>
                    {helyes ? 
                        <div style={{color:"green"}}>{siker} &nbsp;</div> 
                        :  
                        <div style={{color:"red"}}>{siker} &nbsp;</div> }
                </div>
        
        </div>
    )
}

export default KommentFelvitel