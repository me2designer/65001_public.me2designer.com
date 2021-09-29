var localhost = /\d+\.\d+\.\d+\.\d/.test(location.hostname) ? location.hostname : 'localhost';
var LOCAL = {
	name: 'local',	
    public: '//' + localhost + ':65001',
    fonts: '//' + localhost + ':65002',
	blog: '//' + localhost + ':65101',
}

var REAL = {
	name: 'real',
    public: '//public.me2deisnger.com',
    fonts: '//fonts.me2deisnger.com',
	blog: '//blog.me2deisnger.com',
};

var SERVER;
if (/server\=/.test(location.search)) {
	if(/server\=local/.test(location.search)){
        SERVER = LOCAL;
    } else if(/server\=real/.test(location.search)){
        SERVER = REAL;
    } else {
        SERVER = REAL;
    }
} else {
    if (!isNaN(location.host.replace(/\.|\:/g,'')) || /localhost/i.test(location.host)) {
        SERVER = LOCAL;    
    } else {
        SERVER = REAL;
    };
};

switch(SERVER.name){
    case 'real':
        var isReal = true;
    break;    
    case 'local':
        var isLocal = true;
    break;
}



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/



/*  cache */ 
var cache, FILES_CSS, FILES_JS;
cache = '?v='+(new Date).getTime();



/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


/* FILES */ 
function FILES (fileList, callback){
    var result;
    function isOverlap (list, filePath){
        var value;
        for(var i=0; i<list.length; i++){
            if(list[i]==filePath) {
                value = true;
                break;
            }
        }
        return Boolean(value);
    }

    function afterJqLoad(){

        var _result;       

        var CSS = [];
        var JS = [];
        if(Array.isArray(fileList)){
            fileList.forEach(function(v,i,a){
                var isJS = /\.js/.test(v);
                isJS?JS.push(v):CSS.push(v);
            });
        } else {
            var isJS = /\.js/.test(fileList);
            isJS?JS.push(fileList):CSS.push(fileList);
        }

        CSS.forEach(function(v,i,a){
            if(!FILES_CSS) FILES_CSS = [];
            var filePath = CSS[i];
            if(!isOverlap(FILES_CSS, filePath)){
                var head  = document.getElementsByTagName('head')[0];
                var tag  = document.createElement('link');
                tag.rel = 'stylesheet';
                tag.type = 'text/css';
                tag.href = filePath+cache;
                head.appendChild(tag);
                FILES_CSS.push(filePath);
            }
            if(callback && (CSS.length-1==i) && !JS.length) _result = callback();
        });

        if(JS.length){
            (function getJS(i){
                if(!FILES_JS) FILES_JS = [];
                var filePath = JS[i];
                if(!isOverlap(FILES_JS, filePath)){
                    var _cache = /\?/.test(filePath) ? '' : cache;
                    $.getScript(filePath+_cache).done(function(){
                        FILES_JS.push(filePath);
                        if(i!=JS.length-1) {
                            getJS(++i);
                        } else {
                            if(callback) _result = callback();
                        }
                    }).fail(function(){
                        console.log('error : '+filePath);
                        if(i!=JS.length-1) {
                            getJS(++i);
                        } else {
                            if(callback) _result = callback();
                        }
                    });
                } else {
                    console.log('overlab : '+filePath);
                    if(i!=JS.length-1) {
                        getJS(++i);
                    } else {
                        if(callback) _result = callback();
                    }
                }
            })(0);
        }
        return _result;
    }

    if(/undefined/i.test(typeof jQuery)){
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function(){
            if (this.readyState==4&&this.status==200) {
                eval(xml.responseText);
                $.ajaxSetup({cache: true});
                result = afterJqLoad();
            }
        }
        xml.open("GET", SERVER.public+"/lib/jquery/jquery.js"+cache, false);
        xml.send();
    } else {
        result = afterJqLoad();
    }
    return result;
}

FILES([    
    SERVER.blog+'/css/style.css',    
]);
