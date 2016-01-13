$(function () {
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    var wrap = $('.wrap');
    var markerHtml = '<div class="marker"></div>';
    var marker = {};
    var position = {};

    wrap[0].addEventListener('touchstart', function (e) {
        var touch = event.changedTouches[0];
        console.log("[start] "+touch.identifier + ": " + touch.pageX + "  " + touch.pageY);
        position[touch.identifier] = [touch.pageX, touch.pageY];
        marker[touch.identifier] = $(markerHtml).appendTo(wrap);
        if (animationId === null) showMarker();
    }, false);

    wrap[0].addEventListener('touchmove', function (e) {
        for (var i = 0; i < event.targetTouches.length; i++) {
            var touch = event.targetTouches[i];
            position[touch.identifier] = [touch.pageX, touch.pageY];
        }
    }, false);
    wrap[0].addEventListener('touchend', function (e) {
        var touch = event.changedTouches[0];
        console.log("[end] " + touch.identifier + ": " + touch.pageX + "  " + touch.pageY);
        delete position[touch.identifier];
        hideMarker(touch.identifier);
    }, false);

    // repeat refresh
    var animationId = null;
    function showMarker() {
        for (var i in position) {
            marker[i].css({
                'left': position[i][0] + 'px',
                'top': position[i][1] + 'px'
            });
        }
        animationId = requestAnimationFrame(showMarker);
    }

    function hideMarker(id) {
        marker[id].remove();
        if (animationId === null) return;
        for (var i in position) {
            return;
        }
        cancelAnimationFrame(animationId);
        animationId = null;
    };
});