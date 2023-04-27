import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import Dropdown from "./dropdown";
import { arrayToObj } from "../commonUtils"
import ChartCore from "chart.js/auto";
import { CategoryScale } from "chart.js";

ChartCore.register(CategoryScale);

interface ChartProps
{
    riskData: any;
    assetOptions: string[];
    locOptions: string[];
    businessOptions: string[];
    decades: any;
    markerAsset? : string,
    markerCategory? : string,
    markerLocation? : string
}

const chartDataConf = {
    labels: [],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
        {
            label: 'Locations',
            data: [
            ],
            // you can set indiviual colors for each bar
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
        },
        {
            label: '',
            data: [
            ],
            // you can set indiviual colors for each bar
            borderColor: 'rgb(87, 54, 255)',
            backgroundColor: 'rgba(87, 54, 255, 0.5)',
            borderWidth: 1,
        },
        {
            label: 'Business Class',
            data: [
            ],
            // you can set indiviual colors for each bar
            borderColor: 'rgb(48, 255, 76)',
            backgroundColor: 'rgba(48, 255, 76, 0.5)',
            borderWidth: 1,
        }
    ]
};

const generateAssetData = (riskData: any, asset: string, decades: never[]): never[] =>
{
    if (!asset) return [];
    let dataForDecade = arrayToObj(decades);
    let currentAssetData = riskData.filter((e: any) => (e.asset == asset));
    currentAssetData.forEach((e: any) =>
    {
        dataForDecade[e.decade] = e.rating;
    });
    return Object.values(dataForDecade);
}

const generateLocData = (riskData: any, location: string, decades: never[]): never[] =>
{
    if (!location) return [];
    let dataForDecade = arrayToObj(decades);
    let currentLocData = riskData.filter((e: any) => (e.latlng.lat + ',' + e.latlng.lng == location));
    currentLocData.forEach((e: any) =>
    {
        dataForDecade[e.decade] = e.rating;
    });
    return Object.values(dataForDecade);
}

const generateBCategoryData = (riskData: any, category: string, decades: never[]): never[] =>
{
    if (!category) return [];
    let dataForDecade = arrayToObj(decades);
    let currentCategoryData = riskData.filter((e: any) => (e.category == category));
    currentCategoryData.forEach((e: any) =>
    {
        dataForDecade[e.decade] = e.rating;
    });
    return Object.values(dataForDecade);
}

let chartRendered: boolean = false;
let chartRef: any;

function LineChart(props: ChartProps)
{
    chartDataConf.labels = props.decades;
    if (!chartRendered) {
        chartDataConf.datasets[0].data = generateLocData(props.riskData, props.locOptions[0], props.decades);
        chartDataConf.datasets[0].label = 'Location: ' + props.locOptions[0];
        chartDataConf.datasets[1].data = generateAssetData(props.riskData, props.assetOptions[0], props.decades);
        chartDataConf.datasets[1].label = 'Asset: ' + props.assetOptions[1];
        chartDataConf.datasets[2].data = generateBCategoryData(props.riskData, props.businessOptions[0], props.decades);
        chartDataConf.datasets[2].label = 'Category: ' + props.businessOptions[2];
    }

    chartRendered = true;

    const [chartData, setChartData] = useState(chartDataConf);
    const [riskData] = useState(props.riskData);
    const [assetOptions] = useState(props.assetOptions);
    const [selectedAsset, setSelectedAssetValue] = useState(props?.assetOptions?.[0] ?? '');

    const [locOptions] = useState(props.locOptions);
    const [selectedLoc, setSelectedLocValue] = useState(props && props.locOptions ? props.locOptions[0] : '');

    const [businessOptions] = useState(props.businessOptions);
    const [selectedBusiness, setSelectedBusinessValue] = useState(props && props.businessOptions ? props.businessOptions[0] : '');

    useEffect(() => {
        if(props.markerAsset && props.markerCategory && props.markerLocation) {
            handleAssetChange(props.markerAsset);
            handleBusinessChange(props.markerCategory);
            handleLocChange(props.markerLocation);
        }
    }, [props.markerAsset, props.markerCategory, props.markerLocation]);

    function handleLocChange(newValue: string)
    {
        setSelectedLocValue(newValue);
        chartRef.data.datasets[0].label = 'Location: ' + newValue;
        chartRef.data.datasets[0].data = generateLocData(props.riskData, newValue, props.decades);
        
    }

    function handleAssetChange(newValue: string)
    {
        setSelectedAssetValue(newValue);
        chartRef.data.datasets[1].label = 'Asset: ' + newValue;
        chartRef.data.datasets[1].data = generateAssetData(props.riskData, newValue, props.decades);
    }

    function handleBusinessChange(newValue: string)
    {
        setSelectedBusinessValue(newValue);
        chartRef.data.datasets[2].label = 'Category: ' + newValue;
        chartRef.data.datasets[2].data = generateBCategoryData(props.riskData, newValue, props.decades);
    }

    return (
        <div className='chartDiv'>
            <div className='flex justify-around'>
                <div>
                    <label className='mt-3'>Asset Name:</label>
                    <Dropdown selectedVal={selectedAsset} options={assetOptions} onChange={handleAssetChange} />
                </div>
                <div>
                    <label className='mt-3'>Location Coordinates:</label>
                    <Dropdown selectedVal={selectedLoc} options={locOptions} onChange={handleLocChange} />
                </div>
                <div>
                    <label className='mt-3'>Business Category</label>
                    <Dropdown selectedVal={selectedBusiness} options={businessOptions} onChange={handleBusinessChange} />
                </div>
            </div>
            <div className="chart-container mt-3">
                <Line height={7} width={20} ref={(reference) => chartRef = reference}
                    data={chartData}
                    options={{
                        color: 'white',
                        scales: {
                            y: {
                                grid: {
                                    color: '#656666',

                                },
                                ticks: {
                                    color: 'white'
                                },
                                title: {
                                    display: true,
                                    text: 'Risk Rating',
                                    color: 'white'
                                }
                            },
                            x: {
                                grid: {
                                    color: '#656666'
                                },
                                ticks: {
                                    color: 'white'
                                },
                                title: {
                                    display: true,
                                    text: 'Decade',
                                    color: 'white'
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: "Risk Levels over time",
                                color: 'white'
                            },
                            legend: {
                                display: true
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}
export default LineChart;