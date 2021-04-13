/* 
获取 立方体 , 圆柱体 , 等形状  实体app

*/
var cssCity=null;
(function(){
// var main=document.getElementById('main');//临时测试填充区
var zjData={
     //推拉窗,左右推拉
     tlc_0:"<div class='cs_w_0' t='tlc_0'><div class='cs_w_0_0'></div></div>",
     tlc_1:"<div class='cs_w_1' t='tlc_0'><div class='cs_w_1_0'></div></div>",
     //开阖窗 , 两扇推开那种
     khc_0:"<div class='cs_kw_0' t='khc_0'><div class='cs_kw_0_0'></div><div class='cs_kw_0_1'></div></div>",
     khc_1:"<div class='cs_kw_1' t='khc_1'><div class='cs_kw_1_0'></div><div class='cs_kw_1_1'></div></div>",
};

//创建dom
var cjDom=function(str){
   var a=document.createElement('div');
           a.innerHTML=str.trim();
       return a.childNodes[0];
};
 //立方体模板 
var cubeTemplate=
"<div class='cc_base'>"+
      "<div style='width:100%;height:100%' e-base='data' e-event='onclick:select_mx'>"+ 
      "<div class='cc_arrow' e-id='arrow'>"+
        "<div class='cc_arrow_x'><div></div></div>"+
        "<div class='cc_arrow_y'><div></div> </div>"+
        "<div class='cc_arrow_z'><div></div></div>"+
      "</div>"+  
      "<div class='cc_face' e-id='side0' e-base='side0'><div class='cc_correct' e-id='c0'>"+//底部side0
      "<div class='cc_zj_area' t='m0' e-id='m0' e-event='onclick:m_click;onmouseover:m_hver;ondblclick:m_dbclick'></div>"+
      "</div></div>"+
      "<div class='cc_face' e-id='side2' e-base='side2'><div class='cc_correct' e-id='c2'>"+//侧1 side2(左折)
      "<div class='cc_zj_area' t='m2' e-id='m2' e-event='onclick:m_click;onmouseover:m_hver;ondblclick:m_dbclick'></div>"+
      "</div></div>"+
      "<div class='cc_face' e-id='side3' e-base='side3'><div class='cc_correct' e-id='c3'>"+//侧2 side3(右折)
      "<div class='cc_zj_area' t='m3' e-id='m3' e-event='onclick:m_click;onmouseover:m_hver;ondblclick:m_dbclick'></div>"+
      "</div></div>"+
      "<div class='cc_face' e-id='side4' e-base='side4'><div class='cc_correct' e-id='c4'>"+//侧3 side4(上折)
      "<div class='cc_zj_area' t='m4' e-id='m4' e-event='onclick:m_click;onmouseover:m_hver;ondblclick:m_dbclick'></div>"+
      "</div></div>"+
      "<div class='cc_face' e-id='side5' e-base='side5'><div class='cc_correct' e-id='c5'>"+//侧4 side5(下折)
      "<div class='cc_zj_area' t='m5' e-id='m5' e-event='onclick:m_click;onmouseover:m_hver;ondblclick:m_dbclick'></div>"+
      "</div></div>"+
      "<div class='cc_face' e-id='side1' e-base='side1'><div class='cc_correct' e-id='c1'>"+//顶部 side1
      "<div class='cc_zj_area' t='m1' e-id='m1' e-event='onclick:m_click;onmouseover:m_hver;ondblclick:m_dbclick'></div>"+
      "</div></div>"+
      "</div>"+ 
"</div>";


//模型样式修改  
var mxStyle=function(d,dom){//d=[0:w,1:h,2:dx,3:dy,4:x,5:y,6:z,7:jx,8:jy,9:jz,10:xSf,11:ySf,12:zSf] 
     var str='',a,b,c,e,f,g,h,i,j,k,l,m,n;
        
         str='width:'+d[0]+'px;'+'height:'+d[1]+'px;'+
              'transform-origin:'+d[2]+'% '+d[3]+'%;'+
              'transform:translate3d('+d[4]+'px,'+d[5]+'px,'+d[6]+'px) '+
              'rotateX('+d[7]+'deg) rotateY('+d[8]+'deg) rotateZ('+d[9]+'deg)';
         if(d[10]){//缩放
             str+='scale3d('+d[10]+','+d[11]+','+d[12]+');';  
         }else{
             str+=';';
         };    
         //直接dom 修改 
         if(dom){
              dom.style=str;
              return;
         };

         //仅获取拼接样式 字符串
         return str;// 返回 拼接样式字符串                             
};
//面 样式修改修改 
var mStyle=function(dom){// dom=>有: 修改指定, wu:修改选中 
     var str,d,s;
          if(!dom){
               dom=pubFun.select[1]; 
          };
          if(!dom)return;
          
           d=dom.cs_data.cfg;//d=>[0:jx,1:jy,2:jz,3:bg,4:bgt]0,1,2=>jx,jy,jz, 3=>bg (color或url(.图)) 默认0=无  ; 4=>0:适应100% ,1:平铺(默认)
           str='transform:rotateX('+d[0]+'deg) rotateY('+d[1]+'deg) rotateZ('+d[2]+'deg);';
          
          if(d[3]){
                    str+='background:'+d[3]+';'
                    if(d[4]===0){//铺满
                         str+='background-size:100% 100%;'
                    }else if(d[4]===1){
                         str+='background-repeat:repeat;' 
                    };
                    // say(str)
          };
          dom.style=str;
};


//组件 相关 数据修改 或 创建  
var zjStyle=function(zd,t,dom){ //d=>数据 ,t=>0全部创建 ,1:创建单个 2:指定修改  ,dom:新创建时的父dom
    var a,b,c,d,e,f,g,h,i,j,k,l,m,n;
        if(t===2){//修改 选中dom 组件本身 zd=指定数据 {}.cfg
               zjStyle2(pubFun.select[2]);
        }else if(t===1){//创建单个 dop=pDom  zd=子数据
               b=zd.t;
               c=zjData[b]; //domStr
               if(c){
                         d=cjDom(c);//创建组件dom
                         d.cs_zj=true; //用于点击判断是否为组件
                         d.cs_data=zd; //组件数据
                         d.setAttribute('zid',zd.id); //设置组件id
                         zjStyle2(d);
                         dom.appendChild(d);//添加到文档流
               };
        }else if(t===0){ //创建全部dom   dom=pDom容器面本身,  zd=面全部子数据
             for(k in zd){ 
                  //k=zid
                  a=zd[k]; //{ zt:'组件类型id', id:zid,cfg:[0:x,1:y,2:z,3:jx,4:jy,5:jz,6:sfx,7:sfy,8:sfz] }
                  b=a.t;  //组件类型
                  c=zjData[b];
                  if(c){ //存在组件html数据  
                         d=cjDom(c);
                         d.cs_zj=true;
                         d.cs_data=a;
                         d.setAttribute('zid',a.id); //设置组件id
                         zjStyle2(d);
                         dom.appendChild(d);//添加到文档流
                  };
             };    
        };    
};
//组件样式修改
var zjStyle2=function(dom){//dom.cs_data.cfg=[0:x,1:y,2:z,3:jx,4:jy,5:jz,6:sfx,7:sfy,8:sfz] 
     var str,d;
          d=dom.cs_data.cfg;
          str='transform:translate3d('+d[0]+'px,'+d[1]+'px,'+d[2]+'px) '+
               'rotateX('+d[3]+'deg) rotateY('+d[4]+'deg) rotateZ('+d[5]+'deg)'+
               'scale3d('+d[6]+','+d[7]+','+d[8]+');';
          dom.style=str;     
};

cssCity={};
//获取矩形体 [ˈkjuːbɔɪd]    
cssCity.getCuboid=function(cfg){  // {lid:[w,h],side:h} 上下底宽高 和 边高 }
      var app,dom;
          if(!cfg){
                 cfg={ //若无默认 宽高
                    lid:[100,100], //w,h  上下盖子
                    side:200,//h 环绕边的长度 四边的
                 };
          };
          app=new Eng({
               template:cubeTemplate,
               data:{
                    //监控的变化数值 
                    change:{
                         //以下三个选项 分别修改 模型的 缩放,位置和角度
                        sf:[1,1,1],// 缩放 默认都是x=1,y=1,z=1
                        xyz:[0,0,0],  //位置变化
                        jd:[40,0,12],   //角度变化 默认歇着看的
                        init:0,   // 1:代表初始化完成,cs_data 已赋值可以进行下一步 面和子组件操作
                        //以下选项  xg触发对选中目标的修改( 面 和 组件 ) 
                        xg:[],          //修改选中 面 或 组件   0=>0:修改面 ,1:修改组件 ,2:添加  1:有的话是前者的数据
                        
                    },
                    basic:cfg,
                    // basic:{ //基础参数
                    //    lid:[300,230], //w,h  上下盖子
                    //    side:300,//h 环绕边的长度 四边的
                    // },
                    //基于basic 和 每个面相关的参数 
                    data:{
                         base:{//基本盘 , 包含箭头 
                              cfg:[0,0,50,50,0,0,0,40,0,12,1,1,1], //地基基本参数 [0:w,1:h,2:dx,3:dy,4:x,5:y,6:z,7:jx,8:jy,9:jz,10:xSf,11:ySf,12:zSf]    //dx=transform-origin:dx% dy%;
                              // x:0,y:0,z:0,   // 地基 3d偏转位移值
                              // jx:0,jy:0,jz:0,// 角度值 
                              arrow:{//箭头基本参数
                                   with:0,// 箭头的宽度, x轴修改widh, y,z轴修改height
                                   show:1,//1:显示 ,0:否(默认)  //test1
                              }
                         },
                         side0:{//底部  (z=-边/2 )
                              cfg:[0,0,50,50,0,0,0,0,0,0],//0:w,1:h,2,3:dx,dy原点(百分比),4:px,5:py,6:pz(空间位移),7,8,9:jx,jy,jz旋转角度
                              base:{//子元素
                                  cfg:[0,0,50,50,0,0,0,0,0,0],// 容器基板 [0:w,1:h,2:dx,3:dy,4:x,5:y,6:z,7:jx,8:jy,//9:jz,10:xSf,11:ySf,12:zSf,13:bg,14:bgT] 13:color或url 14=>0:100%适应,1:平铺  
                              }   
                         },
                         side1:{//顶部  (z=+边/2 )
                              cfg:[0,0,50,50,0,0,0,0,0,0], //面板
                              base:{
                                   cfg:[0,0,50,50,0,0,0,0,0,0],// 容器基板 (根据父元素调整)
                              }
                         },
                         side2:{//边左  (z=-边/2 , x=lid[0]-side )  (固 dx=0,dy=50,jy=-90)
                              cfg:[0,0,0,50,0,0,0,0,-90,0],
                              base:{
                                   cfg:[0,0,50,50,0,0,0,0,0,0],// 基板
                              }
                         },
                         side3:{//边右  (z=-边/2)  (固 dx=100,dy=50,jy=90)
                              cfg:[0,0,100,50,0,0,0,0,90,0],
                              base:{
                                   cfg:[0,0,50,50,0,0,0,0,0,0],// 基板
                              }
                         },
                         side4:{//边上  (z=边/2)  (固 dx=50,dy=0,jx=90 ,jz=180)
                              cfg:[0,0,50,0,0,0,0,90,0,0],
                              base:{
                                   cfg:[0,0,50,50,0,0,0,0,0,0],// 基板
                              }
                         },
                         side5:{//边下  (z=-边/2)  (固 dx=50,dy=100,jx=-90)
                              cfg:[0,0,50,100,0,0,0,-90,0,0],
                              base:{
                                   cfg:[0,0,50,50,0,0,0,0,0,0],// 基板
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
                            mxStyle(b,i.$_el);
                            //上下底
                            b=a.side0.cfg;       //m0
                            b[0]=n[0],b[1]=n[1];
                            b[6]=-h2;
                            mxStyle(b,i.side0);
                            b=a.side1.cfg;       //m1
                            b[0]=n[0],b[1]=n[1];
                            b[6]=h2;
                            mxStyle(b,i.side1);
                            //左右边  (侧1,侧2)
                            b=a.side2.cfg;     //m2
                            b[0]=h,b[1]=n[1];
                            b[6]=-h2;
                            mxStyle(b,i.side2);
                            b=a.side3.cfg;     //m3
                            b[0]=h,b[1]=n[1];
                            b[4]=n[0]-h; //
                            b[6]=-h2;
                            mxStyle(b,i.side3);
                            //上下边
                            b=a.side4.cfg;   //m4
                            b[0]=n[0],b[1]=h;
                            b[6]=-h2;
                            mxStyle(b,i.side4);

                            b=a.side5.cfg;   //m5
                            b[0]=n[0],b[1]=h;
                            b[5]=n[1]-h;
                            b[6]=-h2;
                            mxStyle(b,i.side5);
                            //调整子面板 方向
                            s=0,e=6;
                            while(s<6){
                              b=a['side'+s].base.cfg;//基板配置
                              d=i['c'+s];// 对应dom
                              if(s>1){//4边,上下底
                                   if(s<4){//2,3左右折
                                        b[0]=n[1],b[1]=h;
                                        b[5]=(b[0]-h)/2;//py=
                                        b[4]=h<b[0]?(h-b[0])/2:0; //px= 边高小于宽?
                                        b[9]=s===3?-90:90;
                                   }else{//上下折
                                        b[0]=n[0],b[1]=h;
                                        if(s===4)b[9]=180;
                                   };
                              }else{//上下盖子
                                   b[0]=n[0],b[1]=n[1];
                              };
                              mxStyle(b,d);
                              s++;  
                            };
                            //调整箭头长度 
                            s=i.arrow.childNodes;//[x,y,z]
                            s[0].style.width=n[0]/2+80+'px';
                            s[1].style.height=n[1]/2+80+'px';
                            s[2].style.height=h/2+80+'px';
                    },

                    //修改 边高  除非 a.lid的修改
                    'basic.side':function(o,n,i,c){
                         var g=i.$_gData,a=g.basic,c=a.lid;
                             setTimeout(function(){
                                a.lid=[c[0],c[1]];
                             }); 
                    },

                    //修改 x,y,z轴 缩放数值  
                    'change.sf':function(o,n,i,c){
                         var g=i.$_gData,a=g.data.base.cfg;
                             a[11]=n[0],a[12]=n[1],a[13]=n[2];
                             mxStyle(a,i.$_el);
                             
                    },

                     //修改 x,y,z轴 位移数值  
                    'change.xyz':function(o,n,i,c){
                         var g=i.$_gData,a=g.data.base.cfg,b=g.basic.side/2;
                             a[4]=n[0],a[5]=n[1],a[6]=n[2]+b;
                             mxStyle(a,i.$_el);    
                    },
                    //修改 x,y,z轴 的角度
                    'change.jd':function(o,n,i,c){
                         var g=i.$_gData,a=g.data.base.cfg;
                             a[7]=n[0],a[8]=n[1],a[9]=n[2];
                             mxStyle(a,i.$_el);    
                    },
                    //触发修改选中 面 或 组件
                    'change.xg':function(o,n,i,c){
                         var a,b,d,e,f,g;
                             a=n[0];
                             if(a===0){//修改选中面数据
                                 mStyle();
                             }else if(a===1){//修改选中的组件数据
                                 zjStyle(null,2);
                             }else if(a===2){//添加新的组件
                                 zjStyle(n[1],1,pubFun.select[1]);
                             };
                             i.$_value=[]; //防止数据污染
                    },
                    //cs_data 已赋值, 进行面和组件元素操作  (仅初始化后操作一次)
                    'change.init':function(o,n,i,c){
                              if(n!==1)return;
                         var a=i.$_el.cs_data.side,b,d,e,f,g,h,k,o;
                         // debugger
                              for(k in a){
                                   //k= 面id
                                   d=a[k]; //{cfg:[],child:[]}
                                   b=i[k]; //e-id 面dom
                                   b.cs_data=d;
                                   mStyle(b); //修改 面
                                   zjStyle(d.child,0,b);//基于面的 组件全部 重新创建
                              };
                    }
               },
               watcherFor:{
               },
               event:{
                    //选择模型
                    select_mx:function(){
                         var t=this,pf=pubFun;
                              // say('选择模型~~~~~~');
                              pf.select[0]=this.$_items.$_el;//储存选中的模型
                              //调用数据面板
                              pf.bottom.mxData(t.parentNode.cs_data.id);
                    },
                    //双击弹开 组件面板
                    m_dbclick:function(e){
                       var t=this,a,b,c
                              a=t.getAttribute('t');// 
                              pubFun.widget.open(1);//打开组件面板
                              e.stopPropagation();
                    },
                    //面点击 (检查是否是子元素 )
                    m_click:function(e){
                        var t=this,a=e.target,b,c,d,e,u,pf=pubFun;
                            if(t.cs_data===u){//面数据没有绑定面 
                                   b=t.getAttribute('t'); //面id    'm'+n
                                   c=t.$_items.$_el.cs_data;//父数据(mx整体数据)
                                   d=c.side[b]; //面数据
                                   t.cs_data=d;//赋值面数据 
                            };
                            pf.select[1]=t;
                            pf.bottom.mData(t);//触发显示面数据
                            if(a.cs_zj===true){//选中的是组件
                                   b=t.cs_data;
                                   c=a.getAttribute('zid');//获取组件id
                                   a.cs_data=b.child[c];//组件赋值数据  
                                   pf.select[2]=a;//储存选中的组件 
                                   pf.bottom.zjData(a); 
                            };
                    },
                    //面hover
                    m_hover:function(){
                         // say('面hover');
                    },
                    //
               },
               created:function(i,c){
                    //  i.$_el;  //模板创建的dom 
                    //  main.appendChild(i.$_el);
                       dom=i.$_el;
               }
          });
          return [app,dom];
};

// cssCity.getCuboid();

})();