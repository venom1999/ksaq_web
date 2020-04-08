var mousex = 0;
var mousey = 0;
function mousePosition(ev) {
    if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
    }
    return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}
function mouseMove(ev) {
    ev = ev || window.event;
    var mousePos = mousePosition(ev);
    mousex = mousePos.x + 20;
    mousey = mousePos.y;
}
function clip() {
    document.getElementById("apDiv1").style.display = "none";
}
function myLink(w) {
    var htmlS = "";
    htmlS = w;
    if (w.length > 5) {
        document.getElementById("apDiv1").innerHTML = htmlS;
        document.getElementById("apDiv1").style.display = "inline";
        mouseMove();
        if (mousex > 800) {
            var h = document.getElementById("apDiv1").offsetWidth;
            mousex = mousex - h - 40;
        }
        document.getElementById("apDiv1").style.left = mousex;
        document.getElementById("apDiv1").style.top = mousey;
    }
}
	  