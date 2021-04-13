/* 
场景地基视角转换 
以及场景模型添加 选择 相关

*/

(function(){
var land=document.getElementById('cs_land');  
var cfg=[300,200,0,0,0,1,800,800,40];         // 应由 gFun.init() 初始化, 此处为默认值
var fData; // 地板数据
var Fun=pubFun;//

//地基 位置,角度 缩放修改调整
var style=function(){
     // debugger
        land.style.transform='translate('+cfg[0]+'px,'+cfg[1]+'px) rotateX('+
                              cfg[2]+'deg) rotateY('+cfg[3]+'deg) rotateZ('+
                              cfg[4]+'deg) scale3d('+cfg[5]+','+cfg[5]+','+cfg[5]+')';
};
var gFun={
     //项目初始化 (用于全新的 同时清空旧模型   连锁调动 floor,model,animation 三个init )
     init:function(){
          var t=this;
              cfg=pjCfg.cfg;
              style();//位置 , 角度 ,缩放 调整 
              t.clear();//清空旧模型
              Fun.right.clear();//清空旧的 右侧列表数据
              t.resetFloor(); //清空重置地板数据
              t.floorInit();  //地板数据初始化
              t.build();//创建所有模型
     },
     //项目初始化前 ,清除所有旧模型
     clear:function(){
          var a=land,b=a.children,l=b.length,c,d,e,f;
               while(l--){
                    c=b[0];
                    d=c.getAttribute('cc');
                    if(d!=='row'){
                         a.removeChild(d);
                    };
               };
     },
     //创建场景模型 (所有)
     build:function(){
          var t=this,a=pjCfg.data.model,k;
              for(k in a){
                  t.addNew(a[k]);
              };
     },
     //单独添加新的模型
     addNew:function(o){//新模型数据
          var t=this,a,b,c,d,e,f,g,h,i,j,k,l,m,n;
            
               a=o.cfg; //[0:x,1:y,2:z,3:w,4:h,5:sh,6:jx,7:jy,8:jz,9:wSF,10:hSf,11:zsf],
          //  debugger
               d=cssCity.getCuboid({lid:[a[3],a[4]],side:a[5]}); // [app,appDom]    
               Fun.cache[o.id]=d;//
               b=d[0].change;//app
               // say(d[0]);
               t.mxCfgChange(b,a);//
               d[1].cs_data=o; //
               d[1].cs_app=d[0];
               b.init=1;//进入 面 组件元素初始化阶段
               land.append(d[1]); //插入文档流
               Fun.right.init();//刷新 模型列表

     },
     //模型属性调整 
     mxCfgChange:function(o,a){ //o=>模型App , a=>模型属性 [0:x,1:y,2:z,3:w,4:h,5:sh,6:jx,7:jy,8:jz,9:wSF,10:hSf,11:zsf],
               o.xyz=[a[0],a[1],a[2]]; //位置
               o.jd=[a[6],a[7],a[8]]; //角度
               o.sf=[a[9],a[10],a[11]];//缩放
     },

     //面数据调整 
     sideCfgChange:function(o,m,d){//o=>模型App  m=>'面 domId ', d=>数据 [0,0,0,0,1],//0,1,2=>jx,jy,jz, 3=>bg (color或url(.图)) 默认0=无  ; 4=>0:适应100% ,1:平铺(默认)
           var a,b,c,e,f,g,h,j,k,l,m,n;
                
     },
     //组件数据调整
     zjCfgChange:function(){

     },
     //地板数据初始化
     floorInit:function(){
              fData=pjCfg.floorData; //地板数据
     },

     //模型数据初始化
     modelInit:function(){

     },

     //动画初始化
     animationInit:function(){

     },

     //检查是否有选中 地板 ,
     getXzFlag:function(){
          if(xzFloor){
               var a=xzFloor.$_data.pos;
                return [a[0],a[1]];
          };     
     },

     //重置选中地板数据 (切换地图 或 修改地图尺寸)
     resetFloor:function(){
          xzFloor=null; //未选中 
     },

     //修改网格尺寸 (在已有数据上进行增删 ,已有的删除, 增加的默认)
     grid:function(w,h){//目标 列数 ,行数  
          var a=app.floor_row,b,c,d,e,f,g,i,j,k,l,m=0,n,fd,fr;
              l=a.length; //行数
              i=0;
              say(w,h)
              if(l>0)m=a[0].floor.length;//每行个数
              say('m=>'+m);
              fd=pjCfg.floorData;// 地板阵列数据
              while(i<l){
                   if(i>=h){ //超出的行数删除
                        a.pop();// 删除队尾的
                        fd.pop();//删除队尾的 地板阵列 行数据
                   }else{//表准内的行数
                        b=a[i];//行数据
                        if(!b){//没有基本行数据时
                            a[i]={floor:[]};
                            b=a[1]; 
                        };
                        fr=fd[i];//地板行数据
                        if(!fr){//没有基本地板阵列行数据时
                            fd[i]=[];
                            fr=fd[i];
                        };
                        if(m>w){ //超出的 列数删除
                             b.floor.splice(w);
                             fr.splice(w);
                        }else{//不足时 补足列数
                             e=m;
                             while(e<w){
                                  b.floor.push({style:''});
                                  fr.push([0,0]); //[旋转方向,bg,]
                                  e++;
                             };
                        };
                   };
                   i++;
              };
              if(l<h){//本身行数不够时
                   c={floor:[ ]};  //每行的初始数据
                   d=[];
                   i=0;
                   //创建整行列数据
                   while(i<w){
                        c.floor.push({style:''});
                        d.push([0,0]);
                        i++;
                   };
                   //插入行数据
                   while(l<h){
                         a.push(reNew(c));
                         fd.push(reNew(d));
                         l++;
                   }; 
              };
              app.floor_row='update';
              this.resetFloor();// 重置选中地板数据
     },
};


Fun.view=gFun;//赋值外部



var xzFloor=null;//点击选中的floor
//开关显示 选中地板, 切换 或 关闭时
var kg_floor=function(dom){
     //之前选中的
     if(xzFloor){
       var b=xzFloor.$_data.pos,d;  //b:选中地板的坐标 
           if(fData){
              d=fData[b[0]<<0][b[1]];
           }else{
              d=[0];
           };
           xzFloor.style.background=d[1]?d[1]:'url(../img/5.png)'; //还原默认地板
     };
     if(dom){
           xzFloor=dom;
           dom.style.background='rgb(252,23,9)'; //选中状态
     };
}; 

var app=new Eng({
     el:land,
     data:{
          floor_row:[ //每行格数
               {
                 floor:[//具体到每格地板
                      /* {
                         style:'',//拼接地面背景 和 宽高  
                         // pos:[], //[行,列] 数组 用于方便点击时读取
                         //bg:'',//每格地板 贴图,       外部对应矩阵赋值
                         // rotate:0, //0-3 *90 deg   外部对应矩阵赋值
                         // w:40,h:40,// 宽高默认40 , 从watcherFor中赋值
                         // 
                      }, */
                 ],   
               }
          ],

     },
     watcher:{

     },
     watcherFor:{

          //具体到每格地板
          floor:function(i,c){
               var a,b,d,e,f,g,h,i,j,k,l,s;
                   a=i.$_data;
                   b=i.$_pos;   //[行号=y , 列号=x]
                   s='width:'+cfg[8]+'px;'+'height:'+cfg[8]+'px;'
                   if(fData){
                      d=fData[b[0]<<0][b[1]]; // [0:角度(0-3),1:bg ]
                   }else{
                      d=[0];  
                   };
                   
                   s+='transform: rotate('+d[0]*90+'deg);';   //角度 0-3* 90deg 4个方向 (上下左右)
                   s+='background:'+(d[1]?d[1]:'url(./img/5.png)')+';'; // 
                 
                   a.style=s;
                   a.pos=[b[1]<<0,b[0]<<0];  //[x,y]
          },

     },
     event:{

          //点击地板操作
          floor_click:function(e){
               var t=this,a=t.$_data,b,c,d,f,g,h;
                   say(a.pos[0]<<0,a.pos[1]);
                   kg_floor(t);
                   e.stopPropagation();
          },
     },
     created:function(){

     }
});










//点击操作
(function(){
var dx=0,dy=0,mx=0,my=0;
var dF=0; //1:点击中,2:非点击中
var btn; //0:左键 (z轴角度),2:右键(x,y轴),1:中键()
var cache; //btn=0时储存角度值 , btn=1时储存x,y值
var body=document.body;
var st=null;//计时器
// var sF=0;
//当鼠标按下时
land.addEventListener('mousedown',function(e){
         btn=e.button;
         dx=e.pageX,dy=e.pageY; //初始坐标
         dF=1;//按下
         if(btn===1){//调整位置
             cache=[cfg[0],cfg[1]]; 
         }else if(btn<3){//调整角度
             cache=[cfg[2],cfg[3],cfg[4]];
         };
         e.preventDefault();
});

document.body.onclick=function(){
     kg_floor();//释放选中
};

//移动
window.addEventListener('mousemove',function(e){
               if(dF===0)return;
           var x,y,mx,my;
               x=e.pageX,y=e.pageY;
               mx=x-dx;   // >0=右移<0=左移
               my=y-dy;  // >0=下移 <0=上移
               // say(btn);
               if(btn===0){//z轴角度  1px = 0.22deg     cache=[x,y,z]
                    // say(mx)
                    cfg[4]=cache[2]-(mx/5);
                    style();
               }else if(btn===2){//调整xy轴  
                    if(my>30||my<-30){ //误差阈值 (小于此值算误操作)
                         my+=my>0?-30:30;  
                         my-=8; //
                         cfg[2]=cache[0]-(my/5); // 上下倾斜
                    };
                    if(mx>30||mx<-30){
                         mx+=mx>0?-30:30;
                         cfg[3]=cache[1]+(mx/5); //左右倾斜
                    };
                    style();
               }else if(btn===1){//中键位移
                    cfg[0]=cache[0]+mx; // 上下移动
                    cfg[1]=cache[1]+my; //左右移动
                    style();
               };
});

//释放
window.addEventListener('mouseup',function(e){
      dF=0; //释放按键
});

//禁用右键菜单
window.addEventListener('contextmenu',function(e){
     e.preventDefault();
});

window.addEventListener('blur',function(){
      dF=0; //释放按键
});
// 角度转弧度 π/180×角度=弧度；  π=Math.PI     角度=弧度/π*180)
// 弧度变角度 180/π×弧度 = 弧度/(π/180)
var radian=Math.PI/180; //弧度 每角度
land.addEventListener('mousemove',function(e){
     //  var x=e.pageX,y=e.pageY,b,c,d,e,f,g;
     //       b=Math.abs(cfg[3])%90;  //当余数是 90度时,意味着 视角和地平线平行了
     //       x=x-cfg[0];
     //       if(b!==0){//有角度形变  (中轴形变)
     //            c=cfg[6]*Math.cos(radian*b);
     //            c=c<<0;//当前形变后的方向宽度
     //            x=x-(cfg[6]-c)/2;// 角度形变 , 实际偏移值
     //            x=(x/c*cfg[6])<<0;// 实际偏移值 于 形变后宽度的比例换算 
     //       };     

     //       b=Math.abs(cfg[2])%90; 
     //       y=y-cfg[1];
     //       if(b!==0){ 
     //           c=cfg[7]*Math.cos(radian*b);
     //           c=c<<0; 
     //           y=y-(cfg[7]-c)/2;
     //           y=(y/c*cfg[7])<<0;
     //       };

     //       say(x,y); 

});


//当鼠标滚轮时
land.onwheel=function(e){
     var n=e.wheelDelta,a;
          a=cfg[5];
          if(n>0){//向上滚放大
             a+=0.1;
             if(a>5)a=5;
          }else if(n<0){//向下滚 缩小
               a-=0.1;
               if(a<0.2)a=0.2;
          };
          cfg[5]=a;
          style();
};

})();//


})();