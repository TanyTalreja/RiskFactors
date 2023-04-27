import React, { useState, useEffect } from 'react';

import '../app/globals.css';

interface DropdownProps
{
    options: any[];
    selectedVal? : string;
    onChange: (selectedValue: string) => void;
}

function Dropdown(props: DropdownProps)
{

    const [selectedValue, setSelectedValue] = useState(props?.options?.[0] && '');

    useEffect(() => {
        if(props.selectedVal)
            setSelectedValue(props.selectedVal)
    }, [props.selectedVal]);
    
    function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>)
    { 
        const newValue = event.target.value;
        setSelectedValue(newValue);
        props.onChange(newValue);
    }

    return (
        <select className='border-solid rounded-md border-2 w-60 border-sky-500 mt-3 ml-3 dropdown-cls' value={selectedValue} onChange={handleDropdownChange}>
            {props.options?.map((option) => (
                <option className='dropdown-op' key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
