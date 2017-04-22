//myFun 這是一個滿版輪播函式，需要依序代入 
//id            要生成在哪個id 
//pcxArr        輪播圖的陣列，例如['./pcx/1.jpg','./pcx/2.jpg','./pcx/2.jpg']
//isAutoPlay    是否自動切換，可填入 true 或 false
function myFun(id, pcxArr, isAutoPlay) {
    var pcxNum = pcxArr.length; //計算有幾張圖
    var mykey = 0; //狀態機，紀錄目前的撥放圖位置 0代表第一張(陣列第一個)
    var isOver = false; //狀態機，紀錄menu是否被mouseover
    var $bg; //暫存生成放置底圖的jq物件， 下面的生成迴圈會用到的變數

    //依照陣列的長度(照片的張數)生成照片DIV
    for (var i = 0; i < pcxNum; i++) {
        $bg = $('<div class="pcxbg"></div>'); //生成一個class pcxbg 的空DIV
        $bg.appendTo(id).css('background-image', 'url(' + pcxArr[i] + ')'); //把這個div的背景設成個張照片
    }

    var $pcxbg = $('.pcxbg');

    //把menu div 加到 #pcx div裡面
    $('<div id="menu"></div>').appendTo('#pcx');

    //依據照片的數量，增加下方 menu的按鈕
    for (i = 0; i < $pcxbg.length; i++) {
        //把menu按鈕增加到#menu，注意這裡，還加上了key屬性，每個按鈕都會對應不同的key
        $('<div class="m_po" key="' + i + '"></div>').appendTo('#menu');
    }

    //全部的menu按鈕 class m_po
    var $m_po = $(".m_po");

    //menu按鈕點擊觸發
    $m_po.on('click', function(e) {
        //$(e.target)是被點的那個按鈕，我們抓取他的key值，*1 代表字串變數值
        var click_id = $(e.target).attr('key') * 1;
        reShow(click_id); //呼叫reShow 並傳入被按的key
    })

    //menu按鈕mouseover
    $('#menu').on('mouseover', function(e) {
        isOver = true;
    })

    //menu按鈕mouseout
    $('#menu').on('mouseout', function(e) {
        isOver = false;
    })

    //所有圖片都先隱藏
    $pcxbg.hide();
    //然後只顯示第一張，這是網頁開始的狀態
    reShow(0)

    //如果 isAutoPlay 值為true，就自動撥放
    if (isAutoPlay) {
        //計時器，每4秒呼叫 next 撥下一張
        setInterval(next, 4000);
    }

    //撥放下一張的函示
    function next() {
        if (isOver) { //如果menu按鈕mouseover狀態，就先不換下一張
            return;
        }
        //下一張的key
        var key = mykey + 1;
        //如果超過總數，就回復到0 (第一張)
        if (key >= pcxNum) {
            key = 0;
        }
        //照片換成指定的key那張 
        reShow(key);
    }

    //照片切換成指定的 click_id
    function reShow(click_id) {
        //$pcxbg是一個陣列(全部的照片物件)，map代表陣列中的東西全部太用下面的函示
        $pcxbg.map(function(key, dom) { //這裡有幾張照片就會跑幾次
            if (key === click_id) { //如果這張是指定的那張圖
                $(dom).stop().fadeIn(2000); //淡入
                $m_po.eq(key).addClass('now'); //他的對應按鈕變黑(增加 class now)
            } else { //下面是是其他沒被點的照片
                $(dom).stop().fadeOut(1000); //淡出
                $m_po.eq(key).removeClass('now'); //按鈕變白(移除 class now)
            }
        })

        //把 mykey 設成目前的照片ID 
        mykey = click_id;
    }
}
