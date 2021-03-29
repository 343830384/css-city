/* 
web简易服务端
*/
/* 
web简易服务端
*/

var http=require('http');
var _url = require('url');
var FS=require('fs');
var F=require('./fileTool').fs;
// var zlib = require('zlib');
var tool =require('./tool.js');
// var stream=require('stream');
var head=tool.head;
var path='./web_files';//基础路径 网页文件
//启动 web 服务
var start=function(){
          console.log('服务启动  127.0.0.1:80');
		var srver= http.createServer(function(req,res){
             var flag=1, url;
                //flag=>0:ajax请求,1:网页请求
		          //  try {
				               url=decodeURI(req.url);
				      //  } catch (error) {
					    //          url=decodeURI(req.url.replace(/%/g, '%25'));  // 将% 的转义为可识别的 %25
				      //  };
					  url=_url.parse(url);
				  var pathName=url.pathname;
			        if(pathName=='/')pathName='/index.html'; //默认路径,若无指定目录
					     pathName=decodeURI(pathName);
					 var query=url.query;//?后的请求
					     if(ajaxFun[query]){ //存在 ajax 请求对齐的处理方法
								   flag=0;
								ajaxReq(req,res,query);
						 }; 
					
				   
						
          var suffix= pathName.split('.').pop(); //获得文件类型后缀
              if(suffix==='ico'){//没有网站图标
                 res.writeHead(404);
                 res.end();
                 return;
              };
					var type=head[suffix]; //获得文件类型对应的 MIME
					
					if(type&&flag){ //type:请求文件类型   flag => 0:普通页面请求 , 1:前台ajax请求命令 
							// console.log(pathName)
						 	  try {
                    // console.log(path+pathName);
                    FS.readFile(path+pathName,function(err,data){
                          try {
                                if(err)throw err;
                          } catch (error) {
                                console.log(error);
                                res.writeHead(404);
                                res.end();
                            return;
                          };
                          
                          res.writeHead(200,{'Content-Type':type});
                          if(data!==undefined)res.write(data);
                          res.end();
                    });
							  } catch (err) { //读取错误处理 (直接关闭)
                      console.log(err);
                      res.writeHead(404);
                      res.end();
							  };
					}else if(flag){
                res.writeHead(404);
                res.end();
				  };
				  
					
		    });//srver END
		srver.on('error',function(err){
			  throw err;
		});
		srver.listen(80,'0.0.0.0');
};

//ajax错误通用处理 默认处理处理  
var errDefault=function(err,res){
    try {
        throw err;
    } catch (error) {
        ajaxFail(res);
    };
  /* 调用写法
     if(err){
           errDefault(err,res);
           return;
     };
  */
};
//ajax请求失败 (数据获取不到等)
var ajaxFail=function(res){
    res.writeHead(404);
    res.end();
  //ajaxFail(res); //错误不响应请求
};

//ajax请求成功 (状态或数据响应) 
var ajaxRes=function(res , data){ //data:数据若有 (此处仅响应 文本 ,json 数据类)
  if(!data)data={msg:'成功'};
  res.writeHead(200,{'Content-Type':'json'});
  if(typeof(data)!=='string')data=JSON.stringify(data);
  res.write(data); //只能写入 string类型 
  res.end();

  //ajaxRes(res,data)
};
//ajax 对应请求处理方法
var ajaxFun={

};


exports.start=start;