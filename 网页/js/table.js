// 获取数据
function getData() {
    selectedData = [];
    var regions = regionSelect.querySelectorAll("input");
    var products = productSelect.querySelectorAll("input");
    selectedRegions = [];
    selectedProducts = [];
    // 获取勾选地区
    for (var i = 1; i < regions.length; i++) {
        if (regions[i].checked) {
            selectedRegions.push(regions[i].value);
        }
    }
    // 获取勾选商品
    for (var i = 1; i < products.length; i++) {
        if (products[i].checked) {
            selectedProducts.push(products[i].value);
        }
    }
    for (var i = 0; i < sourceData.length; i++) {
        // 选了一个地区和多个商品
        if (selectedRegions.length === 1 && selectedProducts.length > 1) {
            for (var j = 0; j < selectedRegions.length; j++) {
                if (sourceData[i].region === selectedRegions[j]) {
                    for (var k = 0; k < selectedProducts.length; k++)
                        if (sourceData[i].product === selectedProducts[k]) {
                            selectedData.push(sourceData[i]);
                        }
                }
            }
        } else {
            for (var j = 0; j < selectedProducts.length; j++) {
                if (sourceData[i].product === selectedProducts[j]) {
                    for (var k = 0; k < selectedRegions.length; k++)
                        if (sourceData[i].region === selectedRegions[k]) {
                            selectedData.push(sourceData[i]);
                        }
                }
            }
        }
    }
}

// 渲染表格
function renderTable() {
    // 渲染表头
    var tableHead = document.querySelector("thead");
    var text = ""
    // 选了一个地区和多个商品
    if (selectedRegions.length === 1 && selectedProducts.length > 1) {
        text = "<th>地区</th><th>商品类型</th>"
        selectedData = selectedData.map(item => {
            return {
                region: item.region,
                product: item.product,
                sale: item.sale
            }
        });
    } else {
        text = "<th>商品类型</th><th>地区</th>"
    }
    tableHead.innerHTML = "<tr>" + text + "<th>一月</th><th>二月</th><th>三月</th><th>四月</th><th>五月</th><th>六月</th><th>七月</th><th>八月</th><th>九月</th><th>十月</th><th>十一月</th><th>十二月</th></tr>"
    // 渲染表格内容
    for (var i = 0; i < selectedData.length; i++) {
        var goodstr = document.createElement("tr");
        for (var j in selectedData[i]) {
            if (j === 'sale') {
                for (var k = 0; k < selectedData[i][j].length; k++) {
                    var salestd = document.createElement("td");
                    var salestext = document.createTextNode(selectedData[i][j][k]);
                    salestd.appendChild(salestext);
                    goodstr.appendChild(salestd);
                }
            }
            else {
                var goodstd = document.createElement("td");
                var goodstext = document.createTextNode(selectedData[i][j]);
                goodstd.appendChild(goodstext);
                goodstr.appendChild(goodstd);
            }
            goodsTable.appendChild(goodstr)
        }
    }
}