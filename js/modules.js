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
    $.fn.makeSvg = function(){
        $(this).each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
            var $this;

            $.ajax({
                url : imgURL,
                dataType : 'xml',
                async : false,
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

                    $this = $svg
                }
            });
        });
    }
    /* 출처 : https://lottoking.tistory.com/425 */



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
                    O.attr('src', url);
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

    //run
    $('[data-images-path]').matchPath();



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/