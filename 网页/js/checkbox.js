// 生成多选框
function setCheckbox(container, checkboxes) {
    var checkAllHTML = "<input type='checkbox' name='region' value='0' checkbox-type='all'>全选"
    var checkboxesHTML = "";
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxesHTML += "<input type='checkbox' name='region' value=" + checkboxes[i].value + ">" + checkboxes[i].text;
    }
    container.innerHTML = checkAllHTML + checkboxesHTML;
    container.addEventListener("click", function (e) {
        var checkboxes = container.querySelectorAll("input");
        if (e.target.getAttribute('checkbox-type') === 'all') {
            if (e.target.checked) {
                for (var i = 1; i < checkboxes.length; i++) {
                    checkboxes[i].checked = true;
                }
            }
        } else {
            var allChecked = true;
            var notChecked = true;
            for (var i = 1; i < checkboxes.length; i++) {
                if (!checkboxes[i].checked) {
                    allChecked = false;
                } else {
                    notChecked = false;
                }
            }
            if (allChecked) {
                checkboxes[0].checked = true;
            } else {
                checkboxes[0].checked = false;
            }
            if (notChecked) {
                e.target.checked = true;
            }
        }
    })
}

// 全选 
function checkAll(e, items) {
    if (e.target.value === '全选') {
        if (items[0].checked) {
            for (var i = 1; i < items.length; i++) {
                items[i].checked = true;
            }
        }
    } else {
        var allChecked = true;
        var notChecked = true;
        for (var i = 1; i < items.length; i++) {
            if (!items[i].checked) {
                allChecked = false;
            } else {
                notChecked = false;
            }
        }
        if (allChecked) {
            items[0].checked = true;
        } else {
            items[0].checked = false;
        }
        if (notChecked) {
            e.target.checked = true;
        }
    }
}
