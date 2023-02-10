import { validateIPAddress, getAdress, addOffset } from './helpers';
import 'leaflet/dist/leaflet.css';  // стили к библиотеке
import L from 'leaflet';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handlekey);


//задаем размеры иконке маркера
const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    // iconAnchor: [20, 90], // чтобы иконка зафиксировалась пока убрано это св-во
})
// для карты контейнер
const mapArea = document.querySelector('.map');
// настройки по умолчанию, где маркер будет устанавливаться 
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});

// стиль оформления карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    // attribution: '© OpenStreetMap'
}).addTo(map);

// добавляем маркер на карту на заданную широту и долготу по умолчанию
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

async function getData() {
    if (validateIPAddress(ipInput.value)) {
        getAdress(ipInput.value).then(printData);
    }
}

function handlekey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function printData(data) {
    const {lat, lng, country, region, timezone: countrytimezone } = data?.location;
    const ip = document.getElementById('ip');
    const location = document.getElementById('location');
    const timezone = document.getElementById('timezone');
    const isp = document.getElementById('isp');

    ip.innerText = data?.ip;
    location.innerText = country + ' ' + region;
    timezone.innerHTML = countrytimezone;
    isp.innerText = data?.isp;

    map.setView([lat, lng]); // показывает заданную область
    L.marker([lat, lng], {icon: markerIcon}).addTo(map); // Для отображения маркера на указанной области

    // адаптив для телефона
    if(matchMedia('(max-width: 1023px)').matches) {
        addOffset(map);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAdress('99.22.11.22').then(printData);
})