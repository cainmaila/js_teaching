function myFun(id, pcxArr, isAutoPlay) {
    var pcxNum = pcxArr.length;
    var mykey = 0;
    var isOver = false;
    var $bg;

    for (var i = 0; i < pcxNum; i++) {
        $bg = $('<div class="pcxbg"></div>');
        $bg.appendTo(id).css('background-image', 'url(' + pcxArr[i] + ')');
    }
    // var $win = $(window);
    var $pcxbg = $('.pcxbg');

    $('<div id="menu"></div>').appendTo('#pcx');

    for (i = 0; i < $pcxbg.length; i++) {
        $('<div class="m_po" key="' + i + '"></div>').appendTo('#menu');
    }

    var $m_po = $(".m_po");

    $m_po.on('click', function(e) {
        var click_id = $(e.target).attr('key') * 1;
        reShow(click_id);
    })

    $('#menu').on('mouseover', function(e) {
        isOver = true;
    })

    $('#menu').on('mouseout', function(e) {
        isOver = false;
    })

    // $win.on('resize', win_resize);
    // win_resize();

    $pcxbg.hide();
    reShow(0)

    if (isAutoPlay) {
        setInterval(next, 4000);
    }

    function next() {
        if (isOver) {
            return;
        }
        var key = mykey + 1;
        if (key >= pcxNum) {
            key = 0;
        }
        reShow(key);
    }

    function reShow(click_id) {
        $pcxbg.map(function(key, dom) {
            if (key === click_id) {
                $(dom).stop().fadeIn(2000);
                $m_po.eq(key).addClass('now');
            } else {
                $(dom).stop().fadeOut(1000);
                $m_po.eq(key).removeClass('now');
            }
        })
        mykey = click_id;
    }


    // function win_resize() { // win_h = $win.height(); // $pcxbg.height(win_h); // }
}
