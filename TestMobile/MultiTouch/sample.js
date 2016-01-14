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
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            position[touch.identifier] = [touch.pageX, touch.pageY];
            marker[touch.identifier] = $(markerHtml).appendTo(wrap);
        }
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
        //console.log("[end] " + touch.identifier + ": " + touch.pageX + "  " + touch.pageY);

        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            marker[touch.identifier].remove();
            delete position[touch.identifier];
            delete marker[touch.identifier];
            hideMarker(touch.identifier);
        }
    }, false);

    // repeat refresh
    var animationId = null;
    function showMarker() {
        try {
            var c = 0;
            for (var i in position) {
                c++;
                if (!(i in marker)) continue;
                    marker[i].css({
                    'left': position[i][0] + 'px',
                    'top': position[i][1] + 'px'
                });
            }
            monitor.html("point: "+c);
            monitor.show();
            animationId = requestAnimationFrame(showMarker);
        } catch (e) {
            alert("show: " + e.message);
        }
    }

    function hideMarker(id) {
        try{
            if (animationId === null) return;
            for (var i in position) {
                return;
            }
            cancelAnimationFrame(animationId);
            monitor.hide();
            animationId = null;
        } catch (e) {
            alert("hide: " + e.message);
        }
    };
});