$(function () {
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    var wrap = $('.wrap');
    var monitor = $('.monitor');
    var markerHtml = '<div class="marker"></div>';
    var marker = {};
    var position = {};

    wrap[0].addEventListener('touchstart', function (e) {
        var touch = event.changedTouches[0];
        var s = "page (" + touch.pageX + ", " + touch.pageY + ")<br/>"
              + "client (" + touch.clientX + ", " + touch.clientY + ")<br/>"
              + "screen (" + touch.screenX + ", " + touch.screenY + ")";
        console.log(s);
        monitor.html(s);
    }, false);
});