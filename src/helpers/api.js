
export async function getAdress(ip = '') {
    const apikey = 'at_aQQy0p9k4CnEZ9a1rwEEqVTu2eQDm&ipAddress';
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apikey}=${ip}`)
    return await response.json();
}