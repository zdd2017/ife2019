function drawLine(data) {
    // 定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    var width = 500;
    var height = 200;
    var axisWidth = 500;
    var axisHeight = 200;
    // 定义好每一个数据点的直径，颜色，线的颜色，宽度
    var radius = 2;
    var dotColor = "red";
    var lineColor = ["black", "red", "blue", "gray", "green", "yellow", "teal", "silver", "lime", "aqua", "fuchsia", "maroon"];
    var lineWidth = 2;
    // 定义好没两个数据点之间的横向间隔距离
    var space = 30;
    // 拿到折线图中的最大值Max
    var sales = [];
    for (var i = 0; i < data.length; i++) {
        sales = sales.concat(data[i].sale);
    }
    var maxSale = Math.max.apply(Math, sales);
    // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    var ratio = (axisHeight - 20) / maxSale;
    // 绘制横轴及纵轴
    var canvas = document.querySelector("#canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, axisHeight);
    ctx.lineTo(axisWidth, axisHeight);
    ctx.stroke();
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].sale.length; j++) {
            //     计算将要绘制数据点的坐标
            var x = (j + 1) * space;
            var y = axisHeight - data[i].sale[j] * ratio;
            //     绘制数据点
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
            ctx.strokeStyle = dotColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            if (j > 0) {
                // 绘制这个数据点和上一个数据点的连线
                ctx.beginPath();
                ctx.moveTo(perx, pery);
                ctx.lineTo(x, y);
                ctx.strokeStyle = lineColor[i];
                ctx.stroke();
            }
            //     记录下当前数据点的数据用于下一个点时绘制连线
            var perx = x;
            var pery = y;
        }
    }
}