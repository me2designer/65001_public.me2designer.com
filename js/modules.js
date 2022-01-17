/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /* GLOBAL */
    var isMain = location.pathname=='/'||location.pathname=='/index.html';



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


    /*
        Device 정보
    */

    function getDevice() {
        var type, detail;
        if (navigator.userAgent.match(/android/i)) {
            type = 'mo';
            detail = 'android';
        } else if (navigator.userAgent.match(/iphone|ipad|ipod/i)) {
            type = 'mo';
            detail = 'ios';
        } else if (navigator.userAgent.match(/mobile|ip(hone|od)|blackberry|iemobile|kindle|netfront|silk-accelerated|(hpw|web)os|fennec|minimo|opera m(obi|ini)|blazer|dolfin|dolphin|skyfire|zune/i)) {
            type = 'mo';
            detail = '';
        } else {
            type = 'pc';
            if (navigator.userAgent.match(/edge/i)) detail = 'edge';
            else if (navigator.userAgent.match(/whale/i)) detail = 'whale';
            else if (navigator.userAgent.match(/chrome/i)) detail = 'chrome';
            else if (navigator.userAgent.match(/opera/i)) detail = 'opera';
            else if (navigator.userAgent.match(/firefox/i)) detail = 'firefox';
            else if (navigator.userAgent.match(/safari/i)) detail = 'safari';
            else if (navigator.userAgent.match(/msie|trident/i)) {
                if (navigator.userAgent.match(/msie 6/i)) detail = 'ie6';
                else if (navigator.userAgent.match(/msie 7/i)) detail = 'ie7';
                else if (navigator.userAgent.match(/msie 8/i)) detail = 'ie8';
                else if (navigator.userAgent.match(/msie 9/i)) detail = 'ie9';
                else if (navigator.userAgent.match(/msie 10/i)) detail = 'ie10';
                else if (navigator.userAgent.match(/rv:11.0/i)) detail = 'ie11';
                else detail = 'ie';
            } else detail = '';
        }
        return {
            type: type,
            detail: detail,
        };
    }



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


    /*


        loadScript({
            url : '외부 스크립트주소',
            afterLoad : function() {
                //callback
            }
        });
    */

    function loadScript() {
        var arg = arguments[0]
        var url = arg.url;

        var script = document.createElement('script');
        script.src = url;
        script.onload = arg.afterLoad ? arg.afterLoad() : '';
        document.getElementsByTagName('head')[0].appendChild(script);
    }


/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*

        *.SVG 파일의 XML Import 기능 ▼

        [html]
        <img src='주소.svg'>

        [js]
        $('img[src*=".svg"]').makeSvg();

    */

    $.fn.makeSvg = function() {
        $(this).each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.ajax({
                url : imgURL,
                dataType : 'xml',
                // async : false,
                success : function(data) {
                    var $svg = $(data).find('svg');
                    if(typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    if(typeof imgClass !== 'undefined') {
                        $svg = $svg.addClass(''+imgClass+' replaced-svg');
                    }
                    $svg = $svg.removeAttr('xmlns:a');
                    if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                    }
                    $img.replaceWith($svg);
                }
            });
        });
    }
    /* 출처 : https://lottoking.tistory.com/425 */



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/




    /*

        lineClamp
        $temp.lineClamp({
            line : 줄수,
            text : 텍스트,
            title : true|false|0~9999 (기본 : false)
            tail : '...',
        })
    */

    $.fn.lineClamp = function() {
        var arg = arguments[0];
        var line,text,tail;

        if(typeof arg == 'object'){
            line = arg.line;
            text = arg.text;
            tail = arg.tail || '...'
        } else {
            line = arg||1;
            text = '';
            tail = '...'
        }

        $(this).each(function (I){

            var O = $(this);

            O.css({
                'min-height': 'none',
                'visibility' : 'hidden'
            });

            var fontSize = Number((O.css('font-size') || '').replace('px', ''));

            var oriTxt = O.attr('data-title');
            var htmlInEl = O.html();
            var txt = text||oriTxt||htmlInEl;

            O.html(txt);

            var parseText = O.html();

            if(!oriTxt) O.attr('data-title', parseText);
            if(arg&&arg.title){
                if(arg.title===true){
                    O.attr('title', parseText)
                } else if(/\d/.test(arg.title)) {
                    if(parseText.length>arg.title) {
                        var _parseText = parseText.slice(0, Number(arg.title));
                        O.attr('title', _parseText+tail);
                    }
                }
            }

            var lh = Math.ceil(Number((O.css('line-height') || '').replace('px', '')));
            if(isNaN(lh)) lh = Math.ceil(fontSize) * 1.35;

            var oriStyle = O.attr('style');
            O.removeAttr('style');
            O.css('height', 'auto');

            var oldTxt = '';
            if(line!=1) O.empty();
            O.css('height', 'auto');
            for (var i = 1; i <= txt.length; i++) {
                var guideH = (lh * line)+(lh/2);
                var newTxt = txt.slice(0,i);
                if(i == txt.length) tail = '';
                O.html(newTxt+tail);
                var H = O.height();
                if (H < guideH) {
                    oldTxt = newTxt;                    
                } else {
                    // O.html(oldTxt+tail);
                    oldTxt = oldTxt.substring(0, oldTxt.length - 3);                    
                    O.html(oldTxt+'...');
                    break;
                }
                O.attr('style', oriStyle)
                var h = O.height();
                var lineLength = Math.ceil(h / lh);
                O.attr('data-line', lineLength).css({
                    'min-height': lh * line,
                    'visibility' : 'visible',
                    'white-space' : 'normal'
                });
            }
        })
    }




/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*
        숫자||숫자(문자) -> , 형태 문자열
        99999 -> '99,999' && '99999' -> '99,999'
        ex ) '9999'.toNumber();
    */

    String.prototype.toNumber = function() {
        var $this = $(this);
        var V = (function(){
            var v = '';
            for(var i=0; i<$this.length; i++){
                var C = $this[i];
                v+=C;
            }
            return v;
        })();

        var V1 = [];
        var V2 = V.match(/\..*$/g) ? V.match(/\..*$/g)[0] : '';

        if(!isNaN(V)){
            var arr = [];
            for(var i=0; i<V.replace(/\..*/,'').length; i++){
                var C = V.charAt(i);
                arr.push(C)
            }
            arr.reverse();
            V1 = '';
            for(var i=0; i<arr.length; i++){
                var C = arr[i];
                V1 = C + (V1.length&&!(i%3)?',':'') + V1;
            }
            return V1 + V2;
        } else {
            return V;
        }
    }

    Number.prototype.toNumber = function(){
        var V = $(this)[0].toString();
        return V.toNumber();
    }



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*

    URL주소 파라미터를 객체값으로 가져오기 ▼

    [script 작성 예]
    get_query()

    */

    function get_query(){
        var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');

    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


/*
[예 : 9 -> '09']
addZero(9)

[예 : 9 -> '00009'];
addZero({
    number : 9,
    size : 5
});

or

addZero(9,5);
 */
function addZero() {
    var arg = arguments[0];
    var num = arg&&arg.number?arg.number:arg;
    num = num.toString();
    var size = arg.size||arguments[1]||2;
    var zero = ''
    for(var i=0; i<(size-num.length); i++){
        zero = '0'+zero;
    }
    return zero+num;
}



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/




/*

    숫자 0 -> ??,???

       $(선택자).animateNumber({
            addComma : true,
            numberSize : 애니메이션 숫자 자리수, // 숫자 : 변환자리수, true : endValue자릿수, false : 자리수변환 없음 (구현중)
            interval : 올라가는 속도,
            totalPlayTime : 애니메이션시간,
            startNumber : 시작 숫자,
            endNumber : 끝나는 숫자,
            startValue : 시작전 값,
            endValue : 끝나고 바뀔 값, // 없을경우 endNumber로 대체
            callback : function(){}
            increase : 증가수, // 증가수이 있을경우 totalPlayTime는 무시됨
        });

       $(선택자) 에 .end를 주는 즉시 애니메이션이 끝난다.

*/
$.fn.animateNumber = function (){

    var $el = $(this);

    var default_option = {
        addComma : true,
        numberSize : false,
        interval : 10,
        totalPlayTime : 1800,
        startNumber : 0,
        endNumber : 99999,
        callback : function(){}
    }
    var options = $.extend(default_option, arguments[0]);
    var endNumber = options.endNumber;
    var numbers = [options.startNumber];
    var pushNumber = options.startNumber;
    var numberSize = options.numberSize;

    if(numberSize){
        if(numberSize===true) numberSize = endNumber.toString().length;
    } else {
        numberSize = 1;
    }

    var isUp = true;
    if(options.hasOwnProperty('increase')){
        isUp = options.increase>0;
    } else {
        isUp = true;
    }

    var init = function () {
        if (isUp ? (pushNumber < endNumber) : (pushNumber > endNumber)) {
            var increase = options.increase ? options.increase : ((options.endNumber - options.startNumber) / options.totalPlayTime * options.interval);
            pushNumber += increase;
            numbers.push((function(){
                var result = pushNumber;
                result = addZero(Math.floor(result), numberSize);
                result = options.addComma ? result.toNumber() : result;
                return result;
            })());
            init();
        }
    }
    init();

    if ($el.hasClass('animating')) {
        $el.addClass('pause');
        return false;
    };

    $el.addClass('animating');
    var action = function (index) {

        var i = index || 0;
        if (numbers[i]) $el.text(numbers[i])
        setTimeout(function () {
            i++;
            if (numbers[i + 1]) {
                if ($el.hasClass('pause')) {
                    action(0)
                    $el.removeClass('pause')
                } else if ($el.hasClass('end')) { // .end를 주는 즉시 애니메이션이 끝난다.
                    action(numbers.length);
                    $el.removeClass('end')
                } else {
                    action(i)
                }
            } else {

                var endValue = options.endValue||options.endNumber

                if(default_option.addComma) {
                    $el.text(endValue.toNumber())
                } else {
                    $el.text(endValue)
                };
                $el.removeClass('animating');
                if (options.callback) options.callback();
            };
        }, options.interval)
    }
    action();
}




/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*

        Path 메칭시키기 ▼

        [html]
        <img src="" data-images-path="/image/svg/arr_bottom01.svg" alt="">

        [JS]
        $('[data-images-path]').matchPath();

        [결과값]
        //localhost
        <img src="//localhost:65003/image/svg/arr_bottom01.svg" alt="">

        //real
        <img src="//images.me2designer.com/image/svg/arr_bottom01.svg" alt="">

    */

    $.fn.matchPath = function(){
        var els = $(this);
        els.each(function () {
            var O = $(this);
            var isImages = O.is('[data-images-path]');

            if (isImages) {
                var host = SERVER.name == 'local' ? '//' + location.hostname + ':65003' : (SERVER.images||'//images.me2designer.com');
                var path = O.attr('data-images-path');
                var url = host + path + cache;

                if (O.is('[src]')) {
                    var test = O.attr('src', url);
                } else if (O.is('[href]')) {
                    O.attr('href', url);
                } else {
                    var style = O.attr('style') || '';
                    style = style.replace(/background\-image.+?\;/g,'');
                    O.attr('style', style + 'background-image : url(' + url + ');');
                }
            }

            O.removeAttr('data-images-path');
        });

        // SVG import
        $('img[src*=".svg"]').makeSvg();
    };



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /* 레이어 */
    /*
        name : pop.html에서 불러올 id,
        callback : 로드 완료후 동작,
    */

    function LAYER(){
        var arg = arguments[0];

        var target;
        if(/string/i.test(typeof arg)){
            arg = {
                name : arguments[0]
            }
        } else {
            arg = arguments[0];
        }

        var target = arg.name;

        FILES(SERVER.public + '/etc/css/layer.css', function(){
            $('#wrap').attr('data-scroll-rock', true);

            var $wrap = $('<div class="layer_wrap hidden" id="' + target + '_wrap"><i class="modal"></i><div class="layer"></div></i><i class="close"><img class="ico" src="" data-images-path="/images/ico/close01.svg"></i></div>');
            $('body').append($wrap);
            var $layer = $wrap.find('.layer');
            var $modal = $wrap.find('.modal');
            var $close = $wrap.find('.close');
            var id = '#' + target;
            var layerT, start, move;

            function afterLayerLoad() {
                $layer.find('.close').on('click', function () {
                    $('#wrap').attr('data-scroll-rock', false);
                    $(window).scroll();
                    $(this).parents('.layer_wrap').remove();
                });

                if ($layer.find(id).length) {
                    LAYER_CASE_inPublic(arg);
                    $wrap.removeClass('hidden');
                    $wrap.find('[data-images-path]').matchPath();
                } else {
                    var HOST;
                    switch (SERVER.name){
                        case 'real':
                            HOST = location.hostname;
                            break;
                        case 'local':
                            HOST = location.hostname+':'+location.port;
                            break;
                    }

                    FILES('//'+HOST + '/etc/css/layer.css');
                    $layer.load('//'+HOST + '/etc/layer.html' + cache + ' ' + id, function () {

                        $layer.find('.close').on('click', function () {
                            $('#wrap').attr('data-scroll-rock', false);
                            $(window).scroll();
                            $(this).parents('.layer_wrap').remove();
                        });
                        try {
                            LAYER_CASE_inLocal(arg);
                            $wrap.removeClass('hidden');
                            $wrap.find('[data-images-path]').matchPath();
                        } catch (e) {
                            $wrap.removeClass('hidden');
                            $wrap.find('[data-images-path]').matchPath();
                        }
                        if(arg.afterLoad) arg.afterLoad();
                    });
                }

                $layer.on('click touchstart', function () {
                    layerT = $layer.find('.content').scrollTop();
                    if(event) start = event.changedTouches ? Math.round(event.changedTouches[0].pageY) : '0';
                });

                if(arg.complete) arg.complete();
            }

            $layer.load(SERVER.public + '/etc/layer.html' + cache + ' ' + id, afterLayerLoad);

            $modal.on('click touchmove', function () {
                $('#wrap').attr('data-scroll-rock', false);
                $(window).scroll();
                $(this).parents('.layer_wrap').remove();
            });

            $close.on('click', function () {
                $('#wrap').attr('data-scroll-rock', false);
                $(window).scroll();
                $(this).parents('.layer_wrap').remove();
            });

            $(document).off('keyup').on('keyup', function(){
                if(event.keyCode == 27) {
                    $('.layer_wrap').last().remove();
                }
                if(!$('.layer_wrap').length){
                    $('#wrap').attr('data-scroll-rock', false);
                    $(window).scroll();
                }
            });
        });
    }




/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*
        scrollAction({
            target: '#cont1',
            top: 0, // 0~100
            scrollDownAction : function(){
                // 스크롤 DOWN 액션
            },
            scrollUpAction : function(){
                // 스크롤 UP 액션
            }
        });
    */

    function scrollAction(){ // 기준요소, 화면기준0~100, 스크롤 내릴때 콜백, 스크롤 올릴때 콜백
        var arg = arguments[0];

        var el = arg.target ? $(arg.target) :  arguments[0];
        var actionPosition = arg.top ? arg.top/100 : (arguments[1] || 0);
        var callback1 = arg.scrollDownAction || arguments[2];
        var callback2 = arg.scrollUpAction || arguments[3];

        var status;
        $(window).on('scroll', function () {
            if(!el.length) return false;
            var windowT = $(this).scrollTop();
            var winH = innerHeight;
            var actionLine = windowT + winH * actionPosition;
            if (actionLine > el.offset().top) {
                if (callback1 && !status) callback1();
                status = true;
            } else {
                if (callback2 && status) callback2();
                status = false;
            }
        }).trigger('scroll');
    }



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/




    /*

        클릭시 스크롤 애니메이션
        moveTo({
            wrap : 스크롤 개체, (기본 : window)
            speed : 속도,
            top : 탑기준 0 (단위 : px),
            target : 이동할 타겟,
            focus : 포커스 타겟,
            afterAction : 콜백
        })

    */

    function moveTo(){
        var arg = arguments[0];
        var speed = arg.speed||400;
        var $wrap = $(arg.wrap||'html, body');
        var $target = $(arg.target);
        var $focus = $(arg.focus);
        var afterAction = arg.afterAction;
        var top = arg.top;

        if (!top) top = 0;
        var headerH = 0;
        if ($('header').css('position') == 'fixed') {
            headerH = $('header').height()
        } else if ($('header').css('position') == 'absolute') {
            headerH = 0
        };

        var T = $target.offset().top - (headerH) - top;

        $wrap.stop().animate({
            scrollTop: T
        }, speed, function(){
            if($focus.length) $focus.focus().select();
            if(afterAction) afterAction();
        });
        $wrap.scroll();
    }




/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*
        sticky({
            target : '#sticky', (필수)
            position : 'top' || 'bottom' || 'auto', (선택),
            callback : function(){}
        });
    */

    function sticky(){
        var arg = arguments[0];

        if(arg.position&&!(arg.position=='auto'||arg.position=='top'||arg.position=='bottom')) return false;

        var $target = $(arg.target);
        var targetH = $target.innerHeight();
        var $wrapper = $target.parent();
        var $div = $('<div class="sticky_wrap"></div>')

        $target.wrap($div);
        var $wrap = $target.parent();
        // $wrap.height(targetH)
        var isTop = arg.position && arg.position != 'auto' && arg.position == 'top';
        var isAuto = !arg.position || arg.position == 'auto';

        if($wrapper.css('position') == 'static') $wrapper.css('position', 'relative');

        // var wrapperPT = Number($wrapper.css('padding-top').replace(/px/, ''));
        // var wrapperPB = Number($wrapper.css('padding-bottom').replace(/px/, ''));
        // $wrapper.css('padding-top' , wrapperPT+targetH);
        // $wrapper.css('padding-bottom' , wrapperPB+targetH);

        $(window).on('scroll', function(){
            var windowT = $(window).scrollTop();
            var windowB = windowT+innerHeight;
            var wrapperT = $wrapper.offset().top;
            var wrapperB = wrapperT + $wrapper.innerHeight();
            var wrapT = $wrap.offset().top;
            var wrapB = wrapT + $wrap.innerHeight();

            // $target.parent('div.sticky_wrap').height($target.height())

            var l = $(window).scrollLeft();
            if($target.css('position') == 'fixed'){
                $target.css({
                    marginLeft : -l
                });
            } else {
                $target.css({
                    marginLeft : 0
                });
            }

            if(isAuto){
                if(windowB-targetH>wrapperT && windowB<wrapB){
                    $target.css({
                        position : 'fixed',
                        width : '100%',
                        top : 'auto',
                        bottom : 0,
                    }).addClass('fixed');
                } else if(windowT+targetH<wrapperB && windowT>wrapT){
                    $target.css({
                        position : 'fixed',
                        width : '100%',
                        top : 0,
                        bottom : 'auto',
                    }).addClass('fixed');
                } else {
                    if(isTop ? (windowT<wrapperT) : (windowB-targetH<wrapperT)){
                        $target.css({
                            position : 'absolute',
                            width : '100%',
                            top : 0,
                            bottom : 'auto',
                        }).removeClass('fixed');
                    } else if (isTop ? (windowT+targetH>wrapperB) : (windowB>wrapperB)){
                        $target.css({
                            position : 'absolute',
                            width : '100%',
                            top : 'auto',
                            bottom : 0,
                        }).removeClass('fixed');
                    } else {
                        $target.css({
                            position : 'relative',
                            width : '100%',
                            top : 'auto',
                            bottom : 'auto',
                        }).removeClass('fixed');
                    }
                }
            } else {
                if(isTop ? (windowT<wrapperT) : (windowB-targetH<wrapperT)){
                    $target.css({
                        position : 'absolute',
                        width : '100%',
                        top : 0,
                        bottom : 'auto',
                    }).removeClass('fixed');
                } else if (isTop ? (windowT+targetH>wrapperB) : (windowB>wrapperB)){
                    $target.css({
                        position : 'absolute',
                        width : '100%',
                        top : 'auto',
                        bottom : 0,
                    }).removeClass('fixed');
                } else {
                    $target.css({
                        position : 'fixed',
                        width : '100%',
                        top : isTop ? 0 : 'auto',
                        bottom : isTop ? 'auto' : 0,
                    }).addClass('fixed');
                }
            }

            if(arg.afterLaod) {
                arg.afterLaod();
                arg.afterLaod = null;
            }
            if(arg.callback) arg.callback();
        }).trigger('scroll');
    }



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*

        사용예 1)
        filterList(listAll, {
            id : '100'
        })

        사용예 2)
        filterList(listAll, {
            typeSecondName : function(type){
                if(/일반/.test(type)) return type;
            }
        })

        사용예 3)
        filterList(listAll, {
            contents : function(contents){
                if(contents[0].indexCode >= 500) {
                    return contents;
                }
            }
        })

        사용예 4)
        filterList(listAll, function(item, index){
            if(item.id == 100) return item;
        });
    */

    function filterList(list, code){

        var ITEMS = [];
        var list = [].concat(list);

        function get(_code) {
            list.forEach(function (item, i) {
                if(item.content){
                    if (item.contents[0].indexCode == _code || item.contents[0].typeFirst == _code || item.contents[0].typeSecond == _code) ITEMS.push(item);
                } else {
                    if (item.indexCode == _code || item.typeFirst == _code || item.typeSecond == _code) ITEMS.push(item);
                }
            });
        }
        if (Array.isArray(code)) {
            code.forEach(function (num, i) {
                get(num);
            });
        } else if(/function/i.test(typeof code)) {
            var arr = [];
            list.forEach(function(v, i){
                if(v){
                    var selected = code(v, i);
                    if(selected) arr.push(selected);
                }
            })
            ITEMS = arr;
        } else if(/object/i.test(typeof code)) {
            for(var key in code){
                list.forEach(function(_list, i){
                    if(_list){
                        if(typeof code[key] == 'function'){
                            var fn = code[key];
                            try {
                                if(fn(_list[key])) ITEMS.push(list[i]);
                                else if(fn(_list.contents[0][key])) ITEMS.push(list[i]);
                            } catch(e){}
                        } else {
                            try {
                                if(_list[key] == code[key]) ITEMS.push(list[i]);
                                else if(_list.contents[0][key] == code[key]) ITEMS.push(list[i]);
                            } catch(e){}
                        }
                    }
                });
            }
        } else {
            get(code);
        }
        return ITEMS;
    }

    var getItems = filterList;



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*

        Array를 n개씩 나누기 ▼

        [script 작성 예]
            var a = [0, 1, 2, 3, 4, 5, 6];
            var b = a.arrDivision(3);
            console.log(b);

        [console 출력결과]
            b[0] : [0, 1, 2]
            b[1] : [3, 4, 5]
            b[2] : [6]
    */

    Array.prototype.arrDivision = function(n) {
        var arr = this.slice();
        var len = arr.length;
        var cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
        var tmp = [];
        for (var i = 0; i < cnt; i++) {
            tmp.push(arr.splice(0, n));
        }
        return tmp;
    }

    /* 출처 : https://snorlaxh.tistory.com/15 */



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    /*

        Array를 n개씩 나누기 ▼

        [script 작성 예]
            var a = [0, 1, 2, 3, 4, 5, 6];
            var b = chunk(infoList, 4);
            console.log(b);

        [console 출력결과]
            b[0] : [0, 1, 2]
            b[1] : [3, 4, 5]
            b[2] : [6]
    */

    // function arrChunk(arr, size) {
    //     var i, j, temparray = [], chunk = size;
    //     for (i = 0, j = arr.length; i < j; i += chunk) {
    //         temparray.push(arr.slice(i, i + chunk));
    //     }
    //     return temparray
    // }


    /* 출처 : https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=brane7&logNo=222047360578 */



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/