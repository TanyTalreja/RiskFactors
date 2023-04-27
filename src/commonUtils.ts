export function formatRiskFactors(jsonStr: string): string
{
    let json = JSON.parse(jsonStr);
    let table = '';
    for (const [key, value] of Object.entries(json)) {
        table += `${key} = ${value}\n`;
    }
    return table;
}

export function arrayToObj(array: any[])
{
    return array.reduce(function (obj, v)
    {
        obj[v] = 0;
        return obj;
    }, {});
}

export function getRiskColor(rating: number): string
{
    if (rating < 0.1) {
        return '#3ffc19';
    } else if (rating < 0.2) {
        return '#d8f51b';
    } else if (rating < 0.4) {
        return '#f5d01b';
    } else if (rating < 0.6) {
        return '#f09c0c';
    } else if (rating < 0.8) {
        return '#f06f0c';
    } else if (rating < 0.9) {
        return '#f0410c';
    } else {
        return '#ff0000';
    }
}