/* 左侧边功能栏  */
(function(){
var land=document.getElementById('cs_land'); //场景地基
var style=land.style;
var Fun=pubFun;
var gFun={
       //读取新项目信息 (地图宽高,网格宽高 并赋值app)  然后通知 view.init() 
      init:function(xm ){
          var t=this,a,b; 
                 pjCfg=xm;
                 a=xm.cfg;// [0:x,1:y,2:jx,3:jy,4:jz,5:sf,6:w,7:h,8:grid]
                 b=app.basic;
                 b.mapw=a[6],b.maph=a[7],b.grid=a[8];
                t.changeSize();//项目网格初始化
                Fun.view.init();//全部模型相关数据初始化
      },

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
Fun.left=gFun;

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
         //基本参数 (地图宽高 网格尺寸) 然后 通知 view 进行角度和缩放调整
          basic:{
               mapw:800,maph:800,//地图宽高 
               grid:40, //map网格 参数
          },
          //模型选择
          model:{
               cube:'长方体',
               cylinder:'圆柱体(暂无)',
               else:'待补充'
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
          //模型选择 ,长方体 ,圆柱体, 
          mx_xz:function(){
              var t=this,a=t.getAttribute('lx')<<0,F;
                  F=Fun.view.getXzFlag();//获取是否有选中的地板目标 的网格  [x,y] 若有的话, 否则默认0
                 if(F){
                      if(a===0){//目前只支持 立方体
                            say('选中立方体');
                            Fun.widget.open(0,a,F);
                      }else{
                            Fun.tool.tip('暂不支持该模型, 待补充......',1);
                      };
                 }else{
                            Fun.tool.tip('没有选中过的地板网格位......',1);
                 };            
          },

      }
});








})();