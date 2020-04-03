function saveForHash() {
    var regionsSave = selectedRegions.join("-");
    var productsSave = selectedProducts.join("-");
    save = encodeURI(regionsSave) + '|' + encodeURI(productsSave);
    window.location.hash = save;
}

function render() {
    if (window.location.hash) {
        var hash = decodeURI(window.location.hash.substring(1)).split("|");
        if (hash[0]) {
            selectedRegions = hash[0].split("-");
        }
        if (hash[1]) {
            selectedProducts = hash[1].split("-");
        }
    }
}
// hash 值改变时渲染内容
window.onhashchange = render;