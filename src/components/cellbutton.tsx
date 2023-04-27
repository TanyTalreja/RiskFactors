import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {formatRiskFactors} from '../commonUtils';

interface CellButtonProps
{
    value: string;
    onClick: (selectedValue: string) => void;
}

function CellButton(props: CellButtonProps)
{
    let popup = null;
    let formattedRiskFactor = formatRiskFactors(props.value)
    const [riskFactor, setRiskFactor] = useState(formattedRiskFactor);

    function onCellBtnClick(event: React.MouseEvent<HTMLElement, MouseEvent>)
    { 
        setRiskFactor(formatRiskFactors(riskFactor));
    }
    return (
        <div>
            <Popup trigger={<i onClick={onCellBtnClick}><FontAwesomeIcon cursor='pointer' size='lg' icon={faEye}/></i>} >
                <div style={{ whiteSpace: 'pre-wrap', lineHeight : 1, padding: 2 }}>{riskFactor}</div>
            </Popup>
        </div>
    );
}

export default CellButton;
