/* 
右侧 地图 物品列表 
*/
(function(){
var Fun=pubFun; 
var nowId=-1; //没有选中的
var gFun={
    //模型数据数据初始化
     init:function(){
         var a=pjCfg.data.model,b,c,d=[],e,f,g,h,i,j,k,l;
             for(k in a){
                 b=a[k]; //{t,id,name}
                 d.push({
                     t:b.t,//类型
                     id:b.id,
                     name:b.name
                 });
             };
             app.model=d;
             app.child=[];//清空面列表
     },
     //面数据初始化 (暂时不需要了)
     sideInit:function(){

     },
     //新项目 销毁之前的所有数据
     clear:function(){
          Fun.cache={};//清空所有缓存
          Fun.select=[];//清空之前选中
          app.model=[];
          app.child=[];
          say('少了 关闭 隐藏 底部 属性面板')
     }
};
Fun.right=gFun;

var app=new Eng({
     el:'right',
     data:{
          model:[//模型数据
               //   {name:'',id:0,t:类型},   //name:模型名称 ,id:模型id 
          ],
          child:[
               //   {name:'',id:0,mid:'面id', pid:'modeId '}, 
          ],
     },
     watcherFor:{
          model:function(i,c){
               var a,b,d,e,f,g,h,j,k;
                   a=i.$_data;
                //    if(a.name=='')a.name='未命名' 
          },
          child:function(i,c){
              var a,b,d,e,f,g,h,j,k;
                  a=i.$_data;
                //   if(a.name=='')a.name='未命名' 
          }, 
     },
     event:{
         //选择大模型 
         xz_model:function(){
           var t=this,d=t.$_data,a;
               //d={id:'mxId',t:'mxLx',name}
               nowId=d.id;//选中的id
               Fun.bottom.mxData(d.id);
         },
         /* xz_child:function(){
          var t=this,a=t.$_data,b,c,d,e,f,g,h,i,j,k,l,m,n;
               say(123123123123)
         }, */
         //模型名称变更
         m_name:function(){
             var t=this,a=t.value.trim(),b,c,d,e,f,g,h,i,j,k;
                 b=Fun.select[0].cs_data;
                 b.name=a;

         },
         //面子元素名称变更
         /* c_name:function(){

         } */
     }
}) 





})();
