/*
    FILES.JS 완료 후 DOM 노출 ▼

    [html 작성 예]
        <div id="wrap" style="visibility: hidden; opacity: 0;">

*/


(function () {
    var $wrap = document.querySelector('#wrap');

    $wrap.style.removeProperty('visibility');
    $wrap.style.removeProperty('opacity');
    $wrap.style.visibility = 'visible';
    $wrap.style.overflow = 'visible';
    $wrap.style.opacity = '1';    
})();



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


