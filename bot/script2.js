

var areas = document.getElementsByTagName("textarea");

var itemList = JSON.parse(localStorage.getItem("qList2"));
if (itemList === null) {
    itemList = {};
}

for (var i=0; i < areas.length; i++) {
    areas[i].addEventListener("input", change);
    if (i in itemList) {
        areas[i].value = itemList[i];
    }
}
console.log(itemList);

function change() {
    for (var i=0; i < areas.length; i++) {
        itemList[i] = areas[i].value;
    }
    localStorage.setItem("qList2", JSON.stringify(itemList));
}