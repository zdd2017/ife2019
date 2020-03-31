function drawBar(data) {
    var chartContanier = document.querySelector("#bar-container");
    //定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    var width = 500;
    var height = 200;
    var axisWidth = 500;
    var axisHeight = 200;
    //定义好每一个柱子的宽度及柱子的间隔宽度
    var barWidth = 30;
    var barSpace = 10;
    //定义好柱子颜色，轴的颜色
    var barColor = "red";
    var axisColor = "black";
    // 拿到柱状图中的最大值Max
    var maxSale = Math.max.apply(Math, data.sale);
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    var ratio = (axisHeight - 20) / maxSale
    // 绘制横轴及纵轴
    var chart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    chart.setAttribute('width', width + 'px');
    chart.setAttribute('height', height + 'px');
    chart.setAttribute("version", "1.1");
    chart.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var axis = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    axis.setAttribute("points", "0 0 0 " + axisHeight + " " + axisWidth + " " + axisHeight);
    axis.setAttribute('style', "fill:white;stroke:" + axisColor + ";stroke-width:2;");
    chartContanier.innerHTML = "";
    chartContanier.appendChild(chart);
    chart.appendChild(axis);
    for (var i = 0; i < data.sale.length; i++) {
        // 计算将要绘制柱子的高度和位置
        // 绘制每一个柱子
        var saleBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        saleBar.setAttribute("width", barWidth);
        saleBar.setAttribute("height", data.sale[i] * ratio);
        saleBar.setAttribute("x", (i + 1) * barSpace + i * barWidth);
        saleBar.setAttribute("y", axisHeight - data.sale[i] * ratio)
        saleBar.style = "fill: " + barColor;
        chart.appendChild(saleBar);
    }
}