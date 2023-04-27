
import L from 'leaflet';

export const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw/gviz/tq?tqx=out:json&tq&gid=681415175';

export const MARKER_ICONS = {
    fontAwesomeIcon: L.divIcon({
        html: "<div class='triangle-down'></div>",
        iconSize: [20, 20],
        className: 'myDivIcon'
    }),
    pngIcon: new L.Icon({
        iconUrl: './marker-red.png',

        iconRetinaUrl: './marker-red.png',
        iconAnchor: new L.Point(0, 0),
        popupAnchor: new L.Point(16, 0),
        iconSize: new L.Point(32, 32),
        className: 'hi-sev'
    })
}