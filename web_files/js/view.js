/* 
场景地基视角转换 
以及场景模型添加 选择 相关

*/

(function(){
var land=document.getElementById('land');  

var gFun={
     //项目初始化 (用于全新的  连锁调动 floor,model,animation 三个init )
     init:function(){

     },
     //地板数据初始化
     floorInit:function(){

     },
     //模型数据初始化
     modelInit:function(){

     },
     //动画初始化
     animationInit:function(){

     },
     //修改网格尺寸 (在已有数据上进行增删 ,已有的删除, 增加的默认)
     grid:function(w,h){//目标 列数 ,行数  
          var a=app.floor_row,b,c,d,e,f,g,i,j,k,l,m=0,n;
              l=a.length; //行数
              i=0;
              if(l>0)m=a[0].floor.length;//每行个数
              while(i<l){
                   if(i>=h){ //超出的行数删除
                        a.pop();// 删除队尾的
                   }else{//表准内的行数
                        b=a[i];//行数据
                        if(m>w){ //超出的 列数删除
                             b.floor.splice(w);
                        }else{//不足时 补足列数
                             e=m;
                             while(e<w){
                                  b.floor.push({style:'',bg:''});
                                  e++;
                             };
                        };
                   };
                   i++;
              };
              if(l<h){//本身行数不够时
                   c={floor:[ ]};  //每行的初始数据
                   i=0;
                   while(i<w){
                        c.floor.push({style:'',bg:''});
                        i++;
                   };
                   while(l<h){
                         a.push(reNew(c));
                         l++;
                   }; 
              };
              app.floor_row='update';
     },
};

pubFun.view=gFun;//赋值外部

var cfg=pjCfg.cfg; // 应由 gFun.init() 初始化, 此处写死

 app=new Eng({
     el:'land',
     data:{
          floor_row:[ //每行格数
               {
                 floor:[//具体到每格地板
                      {
                         style:'',//拼接地面背景 和 宽高  
                         // pos:[], //[行,列] 数组 用于方便点击时读取
                         bg:'',//每格地板 贴图 
                         // w:40,h:40,// 宽高默认40 , 从watcherFor中赋值
                         // 
                      },
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
                   b=i.$_pos;
                   s='width:'+cfg[8]+'px;'+'height:'+cfg[8]+'px;'
                   if(a.bg!==''){
                         say('拼接背景');
                         //  s+='background:url()' 
                   };
                   a.style=s;
                   a.pos=b;
          },

     },
     event:{
          //点击地板操作
          floor:function(){
               var t=this,a=t.$_data,b,c,d,e,f,g,h;
                   say(a.pos[0]<<0,a.pos[1]);
                   
          },
     },
     created:function(){

     }
});








//样式修改调整
var style=function(){
     // debugger
        land.style.transform='translate('+cfg[0]+'px,'+cfg[1]+'px) rotateX('+
                              cfg[2]+'deg) rotateY('+cfg[3]+'deg) rotateZ('+
                              cfg[4]+'deg) scale3d('+cfg[5]+','+cfg[5]+','+cfg[5]+')';
};

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
                    cfg[4]=cache[2]+(mx/5);
                    style();
               }else if(btn===2){//调整xy轴  
                    if(my>30||my<-30){ //误差阈值 (小于此值算误操作)
                         my+=my>0?-30:30;  
                         my-=8; //
                         cfg[2]=cache[0]+(my/5); // 上下反转
                    };
                    if(mx>30||mx<-30){
                         mx+=mx>0?-30:30;
                         cfg[3]=cache[1]+(mx/5); //左右反转
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
     var n=e.wheelDelta;
          if(n>0){//向上滚放大

          }else if(n<0){//向下滚 缩小

          };
};

})();//


})();