/* 
模型 /部件 面板相关 操作

*/
(function(){
var widget=document.getElementById('widget');// 整个操作面板
var model=document.getElementById('model');//模型添加面板
var component=document.getElementById('component');//模型部件面板
var parameter=document.getElementById('parameter');//整个参数区
var cfgChlid=parameter.children;// [模型参数, 部件参数  ]
var cache=null,pos=null,type=null; //储存 [app,aapp模型dom]  pos=模型初始网格添加位置
var Fun=pubFun;
var xzZj=null;//xzZj选中的组件类型id
var gFun={

      //打开 模型 或 部件 面板 
      open:function(n,m,p){//n=>0:打开模型 ,1:打开组件    
           var t=this,a=[model,component],b,c,d,r,f,g,h;
               widget.style.display='block';
               a[n].style.display='block';
               a[n?0:1].style.display='none';
               t.switch(n);
               if(n===0){//m=>0:矩形体,1:圆柱体,2:其它  ,p=[x,y]
                   t.removeAll();
                   type=m;
                   if(m===0){
                         pos=p;  //[x,y]
                         d=app.mcfg;
                         d.x=p[0],d.y=p[1];
                         cache=cssCity.getCuboid({lid:[d.w,d.h],side:d.sh});// 获取矩形体
                         model.appendChild(cache[1]);
                        //  say(cache[0])
                   };
               }else{//打开组件面板  
               };
      },

      //切换 对应 模型或部件 面板 的参数
      switch:function(n){//n: 0:模型 ,1:部件  
           var a=cfgChlid,b,c,d,e;
               a[n].style.display='block';
               a[n?0:1].style.display='none';
      },

      //移除model面板下 所有子元素 ,添加新的
      removeAll:function(){
        var d= model,a=d.childNodes,l=a.length;
            while(l--){
                d.removeChild(a[l]);
            };
      },

      //关闭
      close:function(){
               widget.style.display='none';
               cache=null,pos=null,type=null;
               xzZj=null;
               app.bcfg.xz='';//
      }
};

Fun.widget=gFun;

// pubFun.widget.open(1); //test 直接打开

var app=new Eng({
      el:widget,
      cache:{
          //统一修改 矩形体 尺寸
          mChange:function(t,n){//t=>0:w,1:h,2:sh ; n=值
              if(cache){//存在 
                 var a=cache[0].basic,b=a.lid,d=[b[0],b[1]] ;
                     if(t===2){
                         a.side=n;
                     }else{// t=0:修改w,1:修改h
                         d[t]=n;
                         a.lid=d;
                     };
              };
          },
      },
      data:{
           //模型参数
           mcfg:{
               x:0,y:0,  //网格位置
               w:40,h:40,sh:40,// 模型:  w,h上下底的 宽高 , sh:边高
               sf:1, //缩放 默认1
           },
           //部/组件参数
           bcfg:{
               xz:'', //选中组件
               x:0,y:0,//默认位置
               sf:1,  //缩放 默认1  
           },
      },
      watcher:{
          /* 
          'mcfg.':function(o,n,i,c){}, 
          */
         /* 'mcfg.x':function(o,n,i,c){
              n=n<<0;
              if(n<-200)n=-200;
              if(n>2000)n=2000;
              i.$_value=n;
         }, 
         'mcfg.y':function(o,n,i,c){
              n=n<<0;
              if(n<-200)n=-200;
              if(n>2000)n=2000;
              i.$_value=n;
          }, */
          'mcfg.w':function(o,n,i,c){
              n=n<<0;
              if(n<20)n=20;
              if(n>800)n=800;
              i.$_value=n;
              c.mChange(0,n);
          }, 
          'mcfg.h':function(o,n,i,c){
              n=n<<0;
              if(n<20)n=20;
              if(n>800)n=800;
              i.$_value=n;
              c.mChange(1,n);
          }, 
          'mcfg.sh':function(o,n,i,c){
              n=n<<0;
              if(n<20)n=20;
              if(n>1200)n=1200;
              i.$_value=n;
              c.mChange(2,n);
          },
          'mcfg.sf':function(o,n,i,c){
               var s=typeof(n);
                   if(s==='number'){
                      if(s<0.2)s=0.2;//最小缩放
                      if(s>5)s=5;//最大放大5倍
                   }else{
                      n=o;
                   };
                   i.$_value=n; 
          },
          'bcfg.x':function(o,n,i,c){
              n=n<<0;
              if(n<-200)n=-200;
              if(n>2000)n=2000;
              i.$_value=n;
          },   
          'bcfg.y':function(o,n,i,c){
              n=n<<0;
              if(n<-200)n=-200;
              if(n>2000)n=2000;
              i.$_value=n;
          },  
          'bcfg.sf':function(o,n,i,c){
                 n=n*1;
            var s=typeof(n);
                if(s==='number'){
                  if(s<0.2)s=0.2;//最小缩放
                  if(s>5)s=5;//最大放大5倍
                }else{
                  n=o;
                };
                i.$_value=n; 
          },     

      },
      event:{
          //部件选择 
          bj_xz:function(){
                var t=this,a,b,c,d=t.$_gData.bcfg,f,g,h,i,j,k,l;
                    a=t.getAttribute('t');
                    xzZj=a;//组件类型id
                    d.xz=a;
          },
          //添加模型数据 (添加完成后 调用关闭 )
          add_mx:function(){
                     say('添加模型');
                 var t=this,a=pjCfg,b=a.data, c,s=a.cfg[8],g=t.$_gData.mcfg,d,f,h,i,l,j,k;
                     if(!cache)return; //未有选中支持的模型
                     b.id++;
                     c=b.id;//待添加模型的id
                     b.model[c]={
                            t:type,id:c,name:'未命名',
                            cfg:[g.x*s,g.y*s,0,g.w,g.h,g.sh,0,0,0,1,1,1], //[0:x,1:y,2:z,3:w,4:h,5:sh,6:jx,7:jy,8:jz,9:wSF,10:hSf,11:zsf],
                            zid:-1
                        };
                     d=b.model[c];   
                    if(type===0){//矩形体 固定 6面
                            d.side={};
                            l=6;
                            while(l--){
                                d.side['m'+l]={cfg:[0,0,0,0,1],child:{}};// 面数据
                            };
                    }else if(type===1){

                    }; 
                    Fun.view.addNew(d);
                    gFun.close();  
          },
          //添加组件
          add_zj:function(e){
                //   say('添加组件');
              var t=this,a,b,c,d,f,h,i,l,j,k,o;
                  if(xzZj){//有选中的 组件id  
                       a=Fun.select[1]; //选中的面dom
                       if(a){
                            f=Fun.select[0];//组件dom
                            b=f.cs_data;//父数据
                            o=f.cs_app;
                            b.zid++;
                            b=b.zid;//组件id
                            c=t.$_gData.bcfg;
                            d={
                                t:xzZj,//组件类型
                                id:b,  //组件id
                                cfg:[c.x,c.y,0,0,0,0,c.sf,c.sf,c.sf] ,//[0:x,1:y,2:z,3:jx,4:jy,5:jz,6:sfx,7:sfy,8:sfz],
                            };
                            a.cs_data.child[b]=d;// 添加到pJcfg
                            o.change.xg=[2,d]; //添加新组建 2:添加 ,d:组件数据
                            // debugger
                       }; 
                  }else{
                         Fun.tool.tip('没有选中的组件 \n 请先单击选中想要的组件',1)
                  }
                  gFun.close();
                  
          },
          close:function(){
              gFun.close();
          },
      }
});


})();