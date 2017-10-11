
// norification

;(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD (+ global for extensions)
        define(function () {
            return (global.notification = factory());
        });
    } else if (typeof exports === "object") {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser
        global.notification = factory();
    }
}(this, function () {
    'use strict';
    //传入参数
    //var options={
    //    popup:true,//是否支持弹窗
    //    popup_option:{//弹窗参数
    //        title:'标题',
    //        body:'内容',
    //        icon:'',
    //    },

    //    titleBlink:true,//是否支持document.title闪烁提示
    //    titleBlink_option:{
    //        title:'标题',
    //        rate:300,//以毫秒为单位的数值，闪烁时间间隔
    //    },

    //    sound:true,//是否支持声音提示
    //    sound_option:{
    //        src:'',//声音文件地址
    //    },
    //};

    //用于记录titleBlink的计时器，方便在其他函数中清除
    var intelval;
    var titleInit = document.title;
    var titleStack = [{idStr:0,title:titleInit}];
    function popTitle(popObj){
        titleStack = titleStack.forEach(function(itemObj){
            return (itemObj.idStr != popObj.idStr);
        });
    }

    //window.notification tan
    function showNotify(options){
        if(options.popup){
            popup(options.popup_option);
        }
        if(options.titleBlink){
            titleBlink(options.titleBlink_option);
        }
        if(options.sound){
            sound(options.sound_option);
        }
    };

    function popup(options,callback){
        var self=this;
        if (window.Notification) {

            var title = options.title || '标题',
                body = options.body || '内容';
                //myAddress = options.myAddress || '',//图片icon地址
                //href=options.href;

            var popNotice = function() {
                if (Notification.permission == "granted") {
                    var notification = new Notification(title, {
                        body: body,
                        icon: options.icon,
                        silent:true,
                        noscreen:false,
                    });

                    //self.playSound(myAddress+'/images/notify.mp3');

                    notification.onclick = function() {
                        if(callback){
                            callback();
                        }
                        if(document.hidden){
                            window.focus();
                            console.log(window.location.href);
                        }else{
                            //window.location.href=href;
                            //self.communityView.renderSecurity();
                        }
                        notification.close();
                        //清除titleBlink的计时器
                        if(intelval && intelval!=undefined){
                            clearInterval(intelval);
                            titleStack = [{idStr:0,title:titleInit}];
                        }
                    };
                }
            };
            if (Notification.permission == "granted") {
                popNotice();
            } else if (Notification.permission != "denied") {
                Notification.requestPermission(function (permission) {
                    popNotice();
                });
            }
        } else {
            console.log('浏览器不支持Notification');
        }
    };

    function titleBlink(options){//{roomInfo:'',alarmInfo:'',rate:500}
        titleStack.push({idStr:options.idStr,title:options.roomInfo+ options.alarmInfo});
        if(intelval && intelval!=undefined){
            clearInterval(intelval);
        }
        var isShine = true, icount=0;


        if(titleStack.length > 1){
            intelval=setInterval(function() {
                var len = titleStack.length;
                if (isShine == true) {
                    document.title = titleStack[icount++ % len].title;
                }
            }, options.rate);
        }else{
            document.title = titleInit;
        }

        window.onfocus = function() {
            isShine = false;
            clearInterval(intelval);
            document.title = titleInit;
            titleStack = [{idStr:0,title:titleInit}];
        };
        window.onblur = function() {
            isShine = true;
        };

        // for IE
        document.onfocusin = function() {
            isShine = false;
            clearInterval(intelval);
            document.title = titleInit;
            titleStack = [{idStr:0,title:titleInit}];
        };
        document.onfocusout = function() {
            isShine = true;
        };
    };

    function sound(options){
        var soundSrc=options.src || '../example/images/notify.mp3';//"http://www.gongqinglin.com/accessory/ding.wav";

        var borswer = window.navigator.userAgent.toLowerCase();
        if ( borswer.indexOf( "ie" ) >= 0 )
        {
            //IE内核浏览器
            var strEmbed=document.createElement("embed");
            strEmbed.setAttribute('name','embedPlay');
            strEmbed.setAttribute('src',soundSrc);
            strEmbed.setAttribute('hidden','true');
            strEmbed.setAttribute('autostart','true');
            strEmbed.setAttribute('loop','false');
            if ( document.getElementsByTagName("embed").length <= 0 )
                document.body.appendChild( strEmbed );
            var embed = document.embedPlay;
            //浏览器不支持 audion，则使用 embed 播放
            embed.volume = 100;
            //embed.play();这个不需要
        } else
        {
            //非IE内核浏览器
            var audioSrc=document.createElement("audio");
            audioSrc.setAttribute('id','audioPlay');
            audioSrc.setAttribute('src',soundSrc);
            audioSrc.setAttribute('hidden','true');
            if ( document.getElementsByTagName("audio").length <= 0 )
                document.body.appendChild( audioSrc );
            var audio = document.getElementById( "audioPlay" );

            //浏览器支持 audion
            audio.play();
        }
    };

    return {
        showNotify:showNotify,
        popTitle:popTitle,
    };


}));

