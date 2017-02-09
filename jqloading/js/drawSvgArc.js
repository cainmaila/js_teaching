/**
 * svg百分比圓形繪製物件，執行setAg(0~360)可繪製圓弧
 * @param {String} dom   要繪製的DIV
 * @param {String} r     半徑
 * @param {String} color 顏色
 */
function DrawSvgArc(dom, r, color) {
    ag = 0;
    var $svg = $(dom);
    var srX = r;
    var srY = 0;
    var R = Math.PI / 180;
    var endX = srX;
    var endY = srY;
    $svg.html('<svg width="' + r * 2 + 'px" height="' + r * 2 + 'px"><path d="M' + srX + ' ' + srY + ' A' + r + ' ' + r + ',0 0 1 ' + endX + ' ' + endY + '" stroke="' + color + '" fill="none"></svg>');
    $svg = $svg.find('path');
    this.setAg = function(ag) {
        ag = ag >= 360 ? 360 - 0.01 : ag;
        endX = r + Math.sin(R * ag) * r;
        endY = r - Math.cos(R * ag) * r;
        var agr = ag > 180 ? '1' : 0;
        $svg.attr('d', 'M' + srX + ' ' + srY + ' A' + r + ' ' + r + ',0 ' + agr + ' 1 ' + endX + ' ' + endY);
    }
}
