/* 
获取 立方体 , 圆柱体 , 等形状  实体app

*/
var cssCity=null;
(function(){
var main=document.getElementById('main');//临时测试填充区

 //立方体模板 
var cubeTemplate=
"<div class='base'>"+ 
      "<div class='arrow'>"+
        "<div class='arrow_x'><div></div></div>"+
        "<div class='arrow_y'><div></div> </div>"+
        "<div class='arrow_z'><div></div></div>"+
      "</div>"+  
      "<div class='face' e-id='side0'><div e-id='b0'>底部side0</div></div>"+
      "<div class='face' e-id='side2'><div e-id='b2'>侧1 side2(左折)</div></div>"+
      "<div class='face' e-id='side3'><div e-id='b3'>侧2 side3(右折)</div></div>"+
      "<div class='face' e-id='side4'><div e-id='b4'>侧3 side4(上折)</div></div>"+
      "<div class='face' e-id='side5'><div e-id='b5'>侧4 side5(下折)</div></div>"+
      "<div class='face' e-id='side1'><div e-id='b1'>顶部 side1</div></div>"+
"</div>"


//获取样式字符串
var style=function(d,dom){//d=[0:w,1:h,2:dx,3:dy,4:px,5:py,6:pz,7:jx,8:jy,9:jz],//0:w,1:h,2,3:dx,dy原点(百分比),4,5,6:px,py,pz空间位移,7,8,9:jx,jy,jz旋转角度
     var str='',a,b,c,d,e,f,g,h,i,j,k,l,m,n;
         dom.style.width=d[0]+'px';
         dom.style.height=d[1]+'px';
         dom.style.transformOrigin=d[2]+'% '+d[3]+'%';
         dom.style.transform='translate3d('+d[4]+'px,'+d[5]+'px,'+d[6]+'px) '+
                             'rotateX('+d[7]+'deg) rotateY('+d[8]+'deg) rotateZ('+d[9]+'deg)';   
};


cssCity={};
//获取矩形体
cssCity.getCuboid=function(){  //[ˈkjuːbɔɪd] 
      var app;
          app=new Eng({
               template:cubeTemplate,
               data:{
                    basic:{ //基础参数
                       lid:[110,180], //w,h  上下盖子
                       side:160,//h 环绕边的长度 四边的
                    },
                    //基于basic 和 每个面相关的参数 
                    data:{
                         base:{//基本盘 , 包含箭头
                              cfg:[0,0,50,50,0,0,0,40,0,30], //地基基本参数
                              x:0,y:0,z:0,   // 地基 3d偏转位移值
                              jx:0,jy:0,jz:0,// 角度值 
                              arrow:{//箭头基本参数
                                   with:0,// 箭头的宽度, x轴修改widh, y,z轴修改height
                                   show:1,//1:显示 ,0:否(默认)  //test1
                              }
                         },
                         side0:{//底部  (z=-边/2 )
                              cfg:[0,0,50,50,0,0,0,0,0,0],//0:w,1:h,2,3:dx,dy原点(百分比),4,5,6:px,py,pz空间位移,7,8,9:jx,jy,jz旋转角度
                              child:{//子元素

                              }   
                         },
                         side1:{//顶部  (z=+边/2 )
                              cfg:[0,0,50,50,0,0,0,0,0,0],
                              child:{
                                   
                              }
                         },
                         side2:{//边左  (z=-边/2 , x=lid[0]-side )  (固 dx=0,dy=50,jy=-90)
                              cfg:[0,0,0,50,0,0,0,0,-90,0],
                              child:{
                                   
                              }
                         },
                         side3:{//边右  (z=-边/2)  (固 dx=100,dy=50,jy=90)
                              cfg:[0,0,100,50,0,0,0,0,90,0],
                              child:{
                                   
                              }
                         },
                         side4:{//边上  (z=边/2)  (固 dx=50,dy=0,jx=90 ,jz=180)
                              cfg:[0,0,50,0,0,0,0,90,0,0],
                              child:{
                                   
                              }
                         },
                         side5:{//边下  (z=-边/2)  (固 dx=50,dy=100,jx=-90)
                              cfg:[0,0,50,100,0,0,0,-90,0,0],
                              child:{
                                   
                              }
                         },
                    }     
               },
               watcher:{
                   //上下底处理  side0,side1 (底,顶)
                   'basic.lid':function(o,n,i,c){
                        var g=i.$_gData,a=g.data,b,s,d,e,f,h=g.basic.side,h2=h/2;
                             //h=4条边的长度
                         //     debugger
                            //基盘 
                            b=a.base.cfg;
                            b[0]=n[0],b[1]=n[1];
                            style(b,i.$_el);
                            //上下底
                            b=a.side0.cfg;
                            b[0]=n[0],b[1]=n[1];
                            b[6]=-h2;
                            style(b,i.side0);
                            b=a.side1.cfg;
                            b[0]=n[0],b[1]=n[1];
                            b[6]=h2;
                            style(b,i.side1);
                            //左右边  (侧1,侧2)
                            b=a.side2.cfg;
                            b[0]=h,b[1]=n[1];
                            b[6]=-h2;
                            style(b,i.side2);
                            b=a.side3.cfg;
                            b[0]=h,b[1]=n[1];
                            b[4]=n[0]-h; //
                            b[6]=-h2;
                            style(b,i.side3);
                            //上下边
                            b=a.side4.cfg;
                            b[0]=n[0],b[1]=h;
                            b[6]=-h2;
                            style(b,i.side4);

                            b=a.side5.cfg;
                            b[0]=n[0],b[1]=h;
                            b[5]=n[1]-h;
                            b[6]=-h2;
                            style(b,i.side5);
                            //
                            

                   },
               },
               watcherFor:{

               },
               event:{

               },
               created:function(i,c){
                  //  i.$_el;  //模板创建的dom 
                  main.appendChild(i.$_el);
               }
          })

};

cssCity.getCuboid();

})();