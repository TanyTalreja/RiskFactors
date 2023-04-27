import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMapEvent, useMap, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../app/globals.css'
import L from 'leaflet';
import { LatLng } from 'leaflet';
import React, { useState, useEffect } from 'react';
import Dropdown from './dropdown';
import LineChart from './RiskChart';
import Grid from './grid';
import {SHEET_URL} from '../constants';
import {getRiskColor} from '../commonUtils';

import 'reactjs-popup/dist/index.css';
import '../app/globals.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

let riskData: any[];
let mapRef: any;
let options: number[];
function SetViewOnClick()
{
    const map = useMapEvent('click', (e) =>
    {
        map.setView(e.latlng, map.getZoom(), {
            animate: true,
        })
    })

    return null
}

const Map = () =>
{
    mapRef = React.createRef();
    const [data, setData] = useState<any[]>([]);
    const [assets, setAssets] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [bCategories, setBCategories] = useState<string[]>([]);
    const [gridData, setGridData] = useState<any[]>([]);
    const [selectedValue, setSelectedValue] = useState('2030');
    const [isMounted, setIsMounted] = React.useState(false);
    const [markerAsset, setMarkerAsset] = useState<string>();
    const [markerLocation, setMarkerLocation] = useState<string>();
    const [markerCategory, setMarkerCategory] = useState<string>();

    useEffect(() =>
    {

        const fetchData = async (): Promise<void> =>
        {
            const response = await fetch(SHEET_URL);
            const textData = await response.text();
            riskData = convertToJSON(textData);
            handleDropdownChange(selectedValue);
        };
        fetchData();
        setIsMounted(true);
    }, []);


    const convertToJSON = (data: string) =>
    {
        let jsonData = JSON.parse(data.substring(47).slice(0, -2));
        let headers: string[] = [];
        jsonData.table.cols.forEach((heading: any) =>
        {
            if (heading.label) {
                headers.push(heading.label);
            }
        });
        let sheetJson: any[] = [];
        let yearsSet = new Set<number>();
        let locationSet = new Set<string>();
        let assetSet = new Set<string>();
        let bCategorySet = new Set<string>();
        jsonData.table.rows.forEach((rowData: any) =>
        {
            const row: any = {};
            headers.forEach((ele, ind) =>
            {
                row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
            });
            let latLng = new LatLng(row['Lat'], row['Long']);
            let decade = row['Year'];
            let assetName = row['Asset Name'];
            let bCategory = row['Business Category'];
            yearsSet.add(decade);
            locationSet.add(row['Lat'] + ',' + row['Long']);
            assetSet.add(assetName);
            bCategorySet.add(bCategory);

            sheetJson.push({ 'latlng': latLng, 'asset': assetName, 'category': bCategory, 'rating': row['Risk Rating'], 'riskFactor': row['Risk Factors'], 'decade': decade });
        });
        options = Array.from(yearsSet.values()).sort();
        setAssets(Array.from(assetSet.values()));
        setLocations(Array.from(locationSet.values()));
        setBCategories(Array.from(bCategorySet.values()));
        return sheetJson;
    }

    const Markers = () =>
    {
        const mapRef = useMap();
        const map = useMapEvents({
            moveend(e)
            {
                const currDecadeMarkers = riskData.filter((m: any) =>
                    m['decade'] == selectedValue
                );
                const markersInBounds = currDecadeMarkers.filter((m: any) =>
                    mapRef.getBounds().contains(m['latlng']) && m['decade'] == selectedValue
                );
                setData(markersInBounds);
            },
        })
        return (<div></div>);
    }

    function handleDropdownChange(newValue: string)
    {
        setSelectedValue(newValue);
        const markers = riskData.filter((m: any) =>
            m['decade'] == newValue
        );
        setData(markers);
        setGridData(markers);
    }

    function handleMarkerClick(event : any, asset : string , category : string) {
        setMarkerAsset(asset);
        setMarkerCategory(category);
        setMarkerLocation(event.latlng.lat+','+event.latlng.lng);
    }

    return (
        <div>
            <div className='row'>
                <div className='bg-white w-1/2 h-1/2 mt-2 ml-2 rounded-md'>
                    <label className='ml-3'>Decade: </label>
                    <Dropdown options={options} onChange={handleDropdownChange} />
                    <div className='text-center font-bold text-xl'>{selectedValue}</div><hr></hr>
                    <div className='mt-3 ml-3 mr-3 mb-4'>
                        {isMounted && <MapContainer minZoom={3} ref={mapRef} preferCanvas={true} center={[46.1351, -90.1831]} zoom={2} style={{ height: 450, width: "100%" }}>
                            <TileLayer noWrap={true}
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {data.map((item: any, index: number) => (
                                <div key={index}>
                                    {/* <Marker position={[item.latlng.lat, item.latlng.lng]} icon={fontAwesomeIcon}>
                                        <Popup>
                                            <strong>Asset Name: </strong>{item.asset} <br />
                                            <strong>Business Category:</strong> {item.category}
                                        </Popup>
                                    </Marker> */}
                                    <CircleMarker fill={true} fillOpacity={100} fillColor={getRiskColor(item.rating)} eventHandlers={{
                                        mouseover: (event) => event.target.openPopup(),
                                        click: (event) => handleMarkerClick(event, item.asset, item.category)
                                    }}
                                        color={getRiskColor(item.rating)}
                                        center={[item.latlng.lat, item.latlng.lng]} radius={9} >
                                        <Popup autoClose={true}>
                                            <strong>Asset Name: </strong>{item.asset} <br />
                                            <strong>Business Category:</strong> {item.category}
                                        </Popup>
                                    </CircleMarker>
                                </div>
                            ))}
                            <Markers />
                            <SetViewOnClick />
                        </MapContainer>}
                    </div>
                </div>
                {/* <DataTable data={data}></DataTable> */}
                <div className='gridCls rounded-md bg-white w-1/2 mt-2 ml-2 mr-2'>

                    {gridData?.length > 0 && <Grid gridData={gridData}></Grid>}
                </div>
            </div>
            <div className='bg-white ml-2 mr-2 mt-2 mb-3 rounded-md'>
                {assets?.length > 0 && <LineChart
                    riskData={riskData}
                    assetOptions={assets}
                    locOptions={locations}
                    businessOptions={bCategories}
                    decades={options}
                    markerAsset={markerAsset}
                    markerCategory={markerCategory}
                    markerLocation = {markerLocation} />
                }
            </div>
        </div>
    )
}

export default Map