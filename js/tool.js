/* 
公用方法
 提示方法

*/
(function(){
var tip=document.getElementById('tip'); //提示框
    tip.onclick=function(){
        this.style.display='none';
    };

var gFun={
     //提示信息
     tip:function(str,f){
           tip.style.display='block';
           tip.style.color=f?'red':'blue';
           tip.textContent=str;
     }, 
    

};

pubFun.tool=gFun;

})();