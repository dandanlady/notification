# notification
> A simple, light desktop notification plugin which has no dependencies and based on web Notification 

## Bower Install
  * simple install using: ` bower install notification `.
  * see http://bower.io/ for more information.

## npm Install
  * simple install using: ` npm install notification (or cnpm install notification) `.

## How to Use?
```javaScript
    var options={
            popup:true,//是否支持弹窗
            popup_option:{//弹窗参数
                title:'title',
                body:'content',
                icon:'',//
            },

            titleBlink:true,//是否支持document.title闪烁提示
            titleBlink_option:{
                title:'标题',
                rate:300,//以毫秒为单位的数值，闪烁时间间隔
            },

            sound:false,//是否支持声音提示
            sound_option:{
                src:'',//声音文件地址
            },
        };
        notification.showNotify(options)
```
        
` See the exmple.html for details `
  
## Parameter details

 > popup: 
  >> true //Support desktop pop-up prompts 支持桌面弹窗提示</br>
  >> false //doesn't support  desktop pop-up prompts 不支持桌面弹窗提示</br>
  
 > popup_option(it will work if popup==true):</br>
  >> title:string //弹窗标题</br>
  >> body:string //弹窗内容</br>
  >> icon：string //图片路径</br>
   
 > titleBlink:
  >> true //Support title flash 支持document.title闪烁</br>
  >> false //doesn't support title flash 不支持document.title闪烁</br>
  
 > titleBlink_option(it will work if titleBlink==true):</br>
           >> title:string //document.title标题</br>
           >> rate:number //以毫秒为单位的数值，闪烁时间间隔</br>

 > sound:
  >> true //Support voice prompts 支持声音提示</br>
  >> false //doesn't support voice prompts 不支持声音提示</br>
  
 > sound_option(it will work if sound==true):</br>
  >> src:string,//声音文件地址</br>
        


        
        
