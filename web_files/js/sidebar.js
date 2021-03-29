/* 侧边功能栏  */
(function(){
var land=document.getElementById('land'); //场景地基
var style=land.style;
var gFun={
      //修改地图宽高以及 地板网格
      changeSize:function(){
           var a=app.basic,w=a.mapw,h=a.maph,c,ww,hh,cfg;
               cfg=pjCfg.cfg;
               cfg[6]=w,cfg[7]=h//新的宽高值
               
               style.width=w+'px';
               style.height=h+'px';
               c=a.grid; //网格尺寸
               cfg[8]=c; //复制网格尺寸
               ww=Math.ceil(w/c);// 横向最大格数  列数
               hh=Math.ceil(h/c);// 纵向最大格数  行数
               pubFun.view.grid(ww,hh);//通知修改网格
      },
};

//延迟处理 (防止密集无意义性能损耗)
var st=null;
var yCFun=function(){
      clearTimeout(st);
      st=setTimeout(function(){
           gFun.changeSize();
      });
};


var app=new Eng({
      el:'left',
      data:{
        //基本参数
        basic:{
          mapw:800,maph:800,//地图宽高
          grid:40, //map网格 参数
        },

      },
      watcher:{
         /* 
         '   ':function(o,n,i,c){
         }, 
         */
         //300-2000
         'basic.mapw':function(o,n,i,c){
              n=n<<0;
              if(n<0)n=o;
              if(n<300)n=300;
              if(n>2000)n=200;
              i.$_value=n;
              yCFun();
         },
         //300-2000
         'basic.maph':function(o,n,i,c){
              n=n<<0;
              if(n<0)n=o;
              if(n<300)n=300;
              if(n>2000)n=200;
              i.$_value=n;
              yCFun();
         }, 
         //40-200
         'basic.grid':function(o,n,i,c){
              n=n<<0;
              if(n<0)n=o;
              if(n<40)n=40; //最小值为40;
              if(n>200)n=200;
              i.$_value=n;
              yCFun();
         },  
         
      },
      event:{
            


      }
});








})();