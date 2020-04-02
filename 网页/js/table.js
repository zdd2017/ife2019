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
                    for (var k = 0; k < selectedProducts.length; k++) {
                        if (sourceData[i].product === selectedProducts[k]) {
                            var salesStorage = JSON.parse(localStorage.getItem(sourceData[i].region + " " + sourceData[i].product));
                            if (salesStorage) {
                                selectedData.push({ product: sourceData[i].product, region: sourceData[i].region, sale: salesStorage })
                            } else {
                                selectedData.push(sourceData[i]);
                            }
                        }
                    }
                }
            }
        } else {
            for (var j = 0; j < selectedProducts.length; j++) {
                if (sourceData[i].product === selectedProducts[j]) {
                    for (var k = 0; k < selectedRegions.length; k++)
                        if (sourceData[i].region === selectedRegions[k]) {
                            var salesStorage = JSON.parse(localStorage.getItem(sourceData[i].region + " " + sourceData[i].product));
                            if (salesStorage) {
                                selectedData.push({ product: sourceData[i].product, region: sourceData[i].region, sale: salesStorage })
                            } else {
                                selectedData.push(sourceData[i]);
                            }
                        }
                }
            }
        }
    }
}

// 渲染表格
function renderTable() {
    var editFlag = false;
    var curTd = "";
    var preText = "";
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
        // 给每一行表格添加标识
        goodstr.setAttribute("index", selectedData[i].region + " " + selectedData[i].product);
        for (var j in selectedData[i]) {
            if (j === 'sale') {
                for (var k = 0; k < selectedData[i][j].length; k++) {
                    var salestd = document.createElement("td");
                    // var salesInput = document.createElement("input");
                    // salesInput.value = selectedData[i][j][k];
                    var salestext = document.createTextNode(selectedData[i][j][k]);
                    salestd.appendChild(salestext);
                    goodstr.appendChild(salestd);
                    salestd.addEventListener("mouseover", function (e) {
                        e.stopPropagation();
                        if (!editFlag) {
                            var edit = document.createElement("span");
                            edit.innerHTML = '编辑';
                            edit.setAttribute('class', 'edit');
                            e.target.appendChild(edit);
                        }
                    });
                    salestd.addEventListener("mouseout", function (e) {
                        e.stopPropagation();
                        if (!editFlag) {
                            var edit = e.target.querySelector("span");
                            if (edit) {
                                this.removeChild(edit);
                            }
                        }
                    });
                    salestd.addEventListener("click", function (e) {
                        if (e.target.tagName === 'INPUT') {
                            return;
                        }
                        if (e.target.tagName === 'TD') {
                            if (editFlag && curTd) {
                                curTd.innerHTML = preText;
                                editFlag = false;
                            }
                            curTd = e.target;
                        }
                        e.stopPropagation();
                        editFlag = true;
                        var salesInput = document.createElement("input");
                        preText = this.innerText.split("编辑")[0];
                        salesInput.value = preText;
                        var confirm = document.createElement("button");
                        confirm.innerHTML = "确定";
                        var cancel = document.createElement("button");
                        cancel.innerHTML = "取消"
                        this.innerHTML = ""
                        this.appendChild(salesInput);
                        this.appendChild(confirm);
                        this.appendChild(cancel);
                        salesInput.focus();
                        confirm.addEventListener("click", function (event) {
                            event.stopPropagation();
                            if (!(/^(0|[1-9]\d*)$/.test(salesInput.value))) {
                                alert('请输入非负整数');
                            } else {
                                event.target.parentNode.innerHTML = salesInput.value;
                                editFlag = false;
                            }

                        })
                        document.onkeydown = function (event) {
                            if (editFlag) {
                                if (event.keyCode === 13) {
                                    if (!(/^(0|[1-9]\d*)$/.test(salesInput.value))) {
                                        alert('请输入非负整数');
                                    } else {
                                        curTd.innerHTML = salesInput.value;
                                        editFlag = false;
                                    }
                                } else if (event.keyCode === 27) {
                                    curTd.innerHTML = preText;
                                    editFlag = false;
                                }
                            }
                        }
                        cancel.addEventListener("click", function (event) {
                            event.stopPropagation();
                            this.parentNode.innerHTML = preText;
                            editFlag = false;
                        })
                        wrapper.addEventListener("click", function (event) {
                            if (editFlag) {
                                curTd.innerHTML = preText;
                                editFlag = false;
                            }
                        })
                    })
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