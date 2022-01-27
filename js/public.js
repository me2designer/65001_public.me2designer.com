/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/
    /*
        FILES.JS 완료 후 DOM 노출 ▼

        [html 작성 예]
            <div id="wrap" style="visibility: hidden; opacity: 0;">

    */


    (function() {
        var $wrap = document.querySelector('#wrap');

        if($wrap == null) return;

        $wrap.style.removeProperty('visibility');
        $wrap.style.removeProperty('opacity');
        $wrap.style.visibility = 'visible';
        $wrap.style.overflow = 'visible';
        $wrap.style.opacity = '1';
    })();



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



    function LAYER_CASE_inPublic() {
        var arg = arguments[0];
        var target = arg.name;

        var $wrap = $('#'+target+'_wrap');

        var $layer = $wrap.find('.layer');
        var $modal = $('.layer_wrap>.modal');
        var $close = $('.layer_wrap>.close');

        switch (target) {
            case 'alert':

                if(arg.text) {
                    $('#alert strong').html(arg.text);
                } else if(arg.html) {
                    $('#alert strong').html(arg.html);
                }

                setTimeout(function(){

                    $('#alert .close').trigger('focus');
                }, 100)

            break;
        }

        $('[data-images-path]').matchPath();
        if(arg.afterLoad) {
            arg.afterLoad();
            arg.originalAfterLoad = arg.afterLoad;
            arg.afterLoad = null;
        }
    }



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/




    /*

        동영상 재생 Layer ▼

        [html 작성 예]
            // images.me2designer.com 서버
            <button data-src="/파일위치/동영상.mp4" data-title="제목명" type="button" title="영상재생"><i class="ico_play"></i></button>

            // 내부 호스트에서 불러오기
            <button data-src="/파일위치/동영상.mp4" data-title="제목명" data-type="localhost" type="button" title="영상재생"><i class="ico_play"></i></button>

            // youtube 스트리밍
            <button data-src="https://www.youtube.com/embed/EnOMcY6vAuE" data-title="제목명" data-type="youtube" type="button" title="영상재생"><i class="ico_play"></i></button>

        [script 작성 예]
            $(선택자).videoLayer({
                afterLoad : function(){ // 콜백함수
                    console.log('complete')
                }
            })

    */



    $.fn.videoLayer =  function(){
        var $this = $(this);
        var default_option = {
            afterLoad : function(){}
        }
        var options = $.extend(default_option, arguments[0]);

        // 썸네일
        var $thumb = $this.find('> img.thumb');
        var thumbClass  = $thumb.attr('class');
        var $thumbWrap = $thumb.wrap('<div class="'+thumbClass+'"></div>');
        $thumb.attr('class','');
        $thumbWrap.before('<i class="ico_play"></i>');

        // LAYER
        $this.on('click', function(){
            var $this = $(this);
            var src = $this.attr('data-src');
            var title = function(title){ // modal title 가져오기
                if ($this.attr('data-title')) title = $this.attr('data-title');
                else if ($this.find('.tit').is('[title]')) title = $this.find('.tit').attr('title');
                else if ($this.find('.tit').length) title = $this.find('.tit').text();
                else if ($this.parent().find('.tit').is('[title]')) title = $this.parent().find('.tit').attr('title');
                else if ($this.parent().find('.tit').length) title = $this.parent().find('.tit').text();
                if (title == '') title = '제목없음';
                return title;
            }
            var type = $this.attr('data-type');

            LAYER({
                name : 'videoLayer',
                afterLoad : function(){
                    var $layer = $('#videoLayer_wrap');
                    var $title = $layer.find('.tit_layer');

                    $title.text(title).lineClamp(1);
                    dataType(src, type, $layer);
                },
            });
        });

        function dataType(src, type, $layer){
            switch (type){
                case '':
                case undefined:
                case 'localhost':
                    $layer.find('.contents').append('<video class="video" controls="controls" draggable="true"><source src="" type="video/mp4">해당 브라우저는 이 비디오를 재생할 수 없습니다.<br>크롬 브라우저를 권장합니다.</video>');

                    var $video = $layer.find('video');
                    var $source = $video.find('source');

                    if (type == 'localhost'){
                        $source.attr('src',src);
                    } else {
                        $source.attr('src',SERVER.images+src);
                    }
                    $video[0].play();
                break;
                case 'youtube':
                    $layer.find('.contents').append('<iframe class="youtube" src="'+src+'?autoplay=1&vq=hd1080&rel=0&playsinline=1" frameborder="0" allow="playsinline; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                break;
            }
        }

        // collback
        if (options.afterLoad){
            options.afterLoad($this);
        }
    }



$(function(){/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* matchPath */
    $('[data-images-path]').matchPath();



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* SVG import */
    $('img[src*=".svg"]').makeSvg();



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 스크롤 이동  */
    $('.anchor').on('click', function(){
        var target = $(this).attr('data-target')||$(this).attr('data-anchor');
        var focus = $(this).attr('data-focus');
        if(target){
            moveTo({
                speed : 400,
                top : 0,
                target : target,
                focus : focus,
                afterAction : function(){

                }
            })
        }
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /*
        .isAppear에 FadeIn 적용 ▼

        [html 작성 예]
            //기본값 적용시
            <div class="isAppear">

            //scroll.top 사용자값 입력시(예: class 뒤에 숫자 입력)
            <div class="isAppear50">

        [CSS 작성 예]
            div {opacity:0;transition:none}
            div.appear {opacity:1;transition:opacity 0.3s ease-in-out}
    */

    var $wrap = $("[class*=isAppear]");

    $wrap.each(function(){
        var $this = $(this);
        var classAll = $this.attr('class').split(' ');

        //scroll.top 옵션값 유,무
        var top = filterList(classAll, function(className){
            if (className.indexOf('isAppear') !== -1) {
                var num = className.replace(/[^0-9]/g,'');

                $this.removeClass(className); //removeClass
                return num = num !== '' ? num : 70; //scroll.top 기본값 70 설정함
            }
        })[0];

        //addClass('appear')
        scrollAction({
            target: $this,
            top: Number(top),
            scrollDownAction : function(){
                $this.addClass('appear');
            },
            scrollUpAction : function(){
                if (isReal == false){
                    $this.removeClass('appear');
                }
            }
        });
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/});// DOCUMENT READY...