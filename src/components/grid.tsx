import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CellButton from './cellbutton';

interface GridProps
{
    gridData: any[];
    columnDefs?: any[];
}


const Grid = (props: GridProps) =>
{
    const [gridData, setGridData] = useState(props.gridData);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'asset', filter: 'agTextColumnFilter', sortable: true },
        { field: 'category', filter: 'agTextColumnFilter', sortable: true },
        { field: 'rating', filter: 'agNumberColumnFilter', width: 100, sortable: true },
        { field: 'riskFactor', filter: 'agTextColumnFilter', cellRenderer: CellButton }
    ]);

    useEffect(() => {
        setGridData(props.gridData)
    }, [props.gridData]);
    
    return (
        <div className="ag-theme-alpine-dark justify-center" style={{ height: 500, width: '100%' }}>
            <AgGridReact className='mt-3 ml-3 mr-3'
                pagination={true}
                rowData={gridData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    )
}

export default Grid;