// var load = preload([],{
//     onProgress(){

//     },
//     onCompelet(){

//     }
// })
export default function preload(items,options){//预加载
    var progress = 0;//加载进度
    var current = 0;//当前加载完成数
    items.forEach(function(item,index){
        var img = new Image();
        img.onload = img.onerror =  function(){
            progress = Math.floor(++current/items.length*100);//加载进度
            options.onProgress && options.onProgress(progress);
            if (progress >= 100) {// 加载完成
                options.onCompelete && options.onCompelete();
            }
        }
        img.src = item;
    })
}

