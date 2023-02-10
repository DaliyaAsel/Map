export function addOffset(map) {
    const offsetY = map.getSize().y * 0.1;

    // делаем отступ вниз
    map.panBy([0, -offsetY], { animate: true });
}