/* 
底部 参数 栏, 主要为选中的模型 或 部件
*/
(function(){
var bottom=document.getElementById('bottom');
var area=bottom.getElementsByClassName('b_cfg');//[ 0:矩形体及其组件的区域 , ]
var pth={ //数据路径
      0:'cuboid',//矩形体  
};
var Fun=pubFun;
var mxApp=null,nowT=null,nowArea=null,nowId=-1,nowC=null;//当前正在 操作的数据区域
var mxD=null,mD=null,zjD=null; //三个dom
var st=null,stF=0;//计时器   ,stF=>0:禁止触发修改, 1:允许触发延迟修改

var gFun={
      //模型数据
     mxData:function(id){//id=mxId
         var i=1,l=3,a,n,c,d,dom;
            if(nowId===id)return; //禁止重复处理
            stF=0;
            if(nowArea){//之前打开的关闭
                  nowArea.style.display='none'; 
            };
            nowId=id;//当前模型id
            a=Fun.cache[id];// [mxApp,dom]
            mxApp=a[0];//mxApp
            dom=a[1]; //dom
            mxD=dom;
            d=dom.cs_data;
            n=d.t;//模型类型 0:长方体,  ....后面暂无1:圆柱体,2:

            nowT=n;//当前操作模型的类型
            nowArea=area[n];
            nowArea.style.display='block';
            nowC=nowArea.getElementsByClassName('b_c_rq');// 子区域  模型,面,组件
            
            //新模型选择, 关闭非模型部分的面板,除非选择
            while(i<l){
                  nowC[i].style.display='none';
                  i++;
            };
            Fun.select[0]=dom;//选中的dom
            c=reNew(d.cfg); //防污染
            app[pth[n]].mx=c;// 数据赋值  
            stF=1;//可以触发延迟修改了
     },
     //面数据
     mData:function(dom){//面 dom
      //   debugger
         var a=pth[nowT];
             if(a){//有对应的数据类型
                  stF=0;
                  mD=dom;
                  app[a].side=reNew(dom.cs_data.cfg);
                  nowC[1].style.display='block';
                  Fun.select[1]=dom;
                  stF=1;
             };

     },
     //组件数据
     zjData:function(dom){ // dom
      var a=pth[nowT];
            if(a){//有对应的数据类型
                  stF=0;
                  zjD=dom;
                  app[a].zj=reNew(dom.cs_data.cfg);
                  nowC[2].style.display='block';
                  Fun.select[2]=dom;
                  stF=1;
            };
     },
     //延迟模型数据
     ycMx:function(){
            clearTimeout(st);
            if(stF===0)return;
            st=setTimeout(function(){
                var a=app,b,c,d,e,f,g,h;
                   if(mxApp){
                         if(nowT===0){//长方体处理方式 
                                    a=a.cuboid.mx; //[0,0,0,0,0,0,0,0,0,0,0,0],//0,1,2>x,y,z ; 3,4,5=>w,h,sh ; 6,7,8=>角度x,y,z; 9,10,11=>缩放x,y,z 
                                    mxD.cs_data.cfg=reNew(a);//防污染
                                    b=mxApp.change;
                                    d=mxApp.basic;
                                    d.lid=[a[3],a[4]];//底 宽高
                                    d.side=a[5];//边高
                                    b.xyz=[a[0],a[1],a[2]]; //位置
                                    b.jd=[a[6],a[7],a[8]]; //角度
                                    b.sf=[a[9],a[10],a[11]];//缩放 

                         }else if(nowT===2){
                                
                         };
                   };  
            },200);
     },
     //延迟修改面数据 
     ycM:function(){
            clearTimeout(st);
            if(stF===0)return;
            st=setTimeout(function(){
                  var a=app,b,c,d,e,f,g,h;
                      if(mxApp){
                           if(nowT===0){
                              a=a.cuboid.side;
                           }else{

                           };
                           mD.cs_data.cfg=reNew(a);//防污染
                           mxApp.change.xg=[0];//修改选中面
                      };
            },200);
     },
     //延迟修改组件数据
     ycZj:function(){
            clearTimeout(st);
            if(stF===0)return;
            st=setTimeout(function(){
                  var a=app,b,c,d,e,f,g,h;
                      if(mxApp){
                          if(nowT===0){
                               a=a.cuboid.zj;
                           }else{

                           };
                           zjD.cs_data.cfg=reNew(a);//防污染
                           mxApp.change.xg=[1];//修改选中组件
                      };
            },200);
     },
     //删除 模型 或组件 
     delDom:function(dom){
         var a=dom.parentNode;
             a.removeChild(dom);
     },
     //关闭面板显示  (当删除模型 或 组件时 关闭 , 打开需要重新选择 )
     close:function(){
           if(nowArea)nowArea.style.display='none'; 
           mxApp=null,nowArea=null,nowC=null,nowId=-1;
     }
};
Fun.bottom=gFun;
var app=new Eng({
      el:bottom,
      data:{
            //长方体 以及 其组件
            cuboid:{
                  //模型参数
                  mx:[0,0,0,0,0,0,0,0,0,0,0,0],//0,1,2>x,y,z ; 3,4,5=>w,h,sh ; 6,7,8=>角度x,y,z; 9,10,11=>缩放x,y,z 
                  //面参数
                  side:[0,0,0,0,1],//0,1,2=>jx,jy,jz, 3=>bg (color或url(.图)) 默认0=无  ; 4=>0:适应100% ,1:平铺(默认) 
                  //组件参数
                  zj:[0,0,0,0,0,0,0,0,0],//  0:x, 1:y, 2:z ,3:jx , 4:jy, 5:jz, 6:sfx, 7:sfy, 8:sfz 

            },
      },
      watcher:{

      },
      watcherFor:{
            //矩形体相关~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           
           //圆柱体 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      },
      event:{
            //删除模型 (同时触发 gFun.close()  ,清空 Fun.select=[]   cache中删除, pjCfg中删除 )
            del_mx:function(){
                 var a=pjCfg.data.model,b,c,d,e,f,g,h,i,j,k,l,m,n;
            //      nowId
                     gFun.delDom(mxD);//删除模型dom
                     delete Fun.cache[nowId]; //删除缓存
                     delete a[nowId]; //数据中删除
                     Fun.select=[];   //清空选中
                     gFun.close();    //关闭面板
                     Fun.right.init();//右侧列表初始化 
                       
            },
            //删除组件 (zjD=null, 关闭组件参数面板,  )
            del_zj:function(){
                var a=zjD.cs_data.id,b=mD.cs_data.child,c,d,e,f,g,h,i,j;
                    gFun.delDom(zjD);
                    delete b[a];//数据中删除
                    zjD=null;
                    nowC[2].style.display='none';//关闭参数面板
                    Fun.select[2]=null;          //取消选中
            },
            //长方体 背景图 处理方式
            bg_fun0:function(e){
                  var t=this,a=t.$_gData.cuboid.side,b;
                      b=t.getAttribute('t')<<0;
                      a[4]=b;
            },
      },
      created:function(i,c){
            var a,b,d,e,f,g,h,j,k,l,m,n;
                a=i.$_gData;//全部数据

                //分模型全部注册watcher
                l=12;//0,1,2>x,y,z ; 3,4,5=>w,h,sh ; 6,7,8=>角度x,y,z; 9,10,11=>缩放x,y,z 
                //cuboid.mx0.
                while(l--){
                      e='cuboid.mx.'+l;
                      g={};
                      (function(){
                          var a=l; 
                              g[e]=function(o,n,i,c){
                                    n=n*1;
                                   if(isNaN(n)){//非法数据
                                       Fun.tool.tip('非法数据',1);
                                       i.$_value=o;
                                       return;
                                   };
                                    if(a<3){//0-2x,y,z
                                        if(n>3000)n=3000;
                                        if(n<-200)n=-200;

                                    }else if(a<6){//3-5 w,h,sh
                                         if(a<5){//w,h
                                                if(n<20)n=20;
                                                if(n>800)n=800;
                                         }else{//sh
                                              if(n<20)n=20;
                                              if(n>1400)n=1400; 
                                         };
                                    }else if(a<9){//6,7,8: jx,jy,jz
                                          if(n>359||n<-359)n=0;
                                    }else{// 9,10,11: 缩放 x,y,z
                                          if(n<0.2)s=0.2;//最小缩放
                                          if(n>5)s=5;//最大放大5倍
                                    };
                                    i.$_value=n;
                                    //延迟修改
                                    gFun.ycMx();
                              }; 
                      })();
                      
                      i.$_watcher(g);
                };
                l=5;//0,1,2=>jx,jy,jz, 3=>bg (color或url(.图)) 默认0=无  ; 4=>0:适应100% ,1:平铺(默认) 
                //cuboid.side0.
                while(l--){
                      e='cuboid.side.'+l;
                      g={};
                      if(l===4){
                              //背景图 处理方式  ( 通过切换选择按钮选择触发  )   
                              g[e]=function(o,n,i,c){
                                    //修改选中checkbox
                                var a=i.d_sy0,b=i.d_pp0,d=i.$_gData.cuboid.side;
                                    a.checked=n===0?true:false;
                                    b.checked=n===1?true:false;
                                    //触发修改
                                    gFun.ycM();
                              }; 
                      }else if(l===3){//背景色
                              g[e]=function(o,n,i,c){
                                     if(n===0)n='';
                                     i.$_value=n;
                                     //触发修改
                                     if(n)gFun.ycM();
                              }; 
                     }else{ //角度  
                              g[e]=function(o,n,i,c){
                                    n=n*1;
                                    if(isNaN(n)){//非法数据
                                       Fun.tool.tip('非法数据',1);
                                       i.$_value=o;
                                       return;
                                    };
                                    if(n>359||n<-359)n=0;
                                    i.$_value=n;
                                    //触发修改
                                    gFun.ycM();
                              }; 
                     };
                      i.$_watcher(g);
                };
               l=9;// [0,0,0,0,0,0,0,0,0],//  0:x,1:y,2:z,3:jx,4:jy,5:jz,6:sfx,7:sfy, 8:sfz 
               //cuboid.zj.
               while(l--){
                  e='cuboid.zj.'+l;
                  g={};
                        (function(){
                              var a=l; 
                              g[e]=function(o,n,i,c){
                                          n=n*1;
                                          if(isNaN(n)){//非法数据
                                                Fun.tool.tip('非法数据',1);
                                                i.$_value=o;
                                                return;
                                          };
                                          if(a<3){//0-2x,y,z
                                                if(n>2000)n=2000;
                                                if(n<-200)n=-200;
                                          }else if(a<6){//3-5 jx,jy,jz
                                                if(n>359||n<-359)n=0;
                                          }else if(a<9){//6,7,8: sfx,sfy,sfz
                                                if(n<0.2)s=0.2;//最小缩放
                                                if(n>5)s=5;//最大放大5倍
                                          };
                                          i.$_value=n;
                                          //触发修改
                                          
                                          gFun.ycZj();
                              };   
                         })();
                  i.$_watcher(g);           
               };  

      }
})

  
})();