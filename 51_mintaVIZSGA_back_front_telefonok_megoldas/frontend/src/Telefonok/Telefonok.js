import { useState } from 'react';
import Lenyilo from './Lenyilo';
import TelefonTipusSzerint from './TelefonTipusSzerint';

const Telefonok = () => {
    const [kivalasztott, setKivalasztott] = useState(1);

    return (
        <div>
            <div style={{ textAlign: "center", marginBottom: 20, fontSize: "24px", fontWeight: "bold" }}>
                Telefonok
            </div>

            <div className="row">
                <div className="col-sm-4">
                    <Lenyilo setKivalasztott={setKivalasztott} />
                </div>

                <div className="col-sm-8">
                    <TelefonTipusSzerint kivalasztott={kivalasztott} />
                </div>
            </div>
        </div>
    );
};

export default Telefonok;