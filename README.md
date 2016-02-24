# Kever
A light node app server framework, based on *koa*.  
基于 *koa* 的轻型app后台框架

##### Usage
使用中您只需要关注一下目录:
* *Router*　　　　控制器，逻辑处理  
    * 每个文件中的每个函数都是一个路由节点，例如 user.js中有login函数，其访问路径就是 "/user/login"  
    * 每个方法都能识别get和post请求，如需要其他格式请求请自行添加，请参照 "/lib/run.js" 进行扩展
* *Model*　　　　 数据访问
    * 每个文件对应一个model对象
    * model对象已经绑定到中间件的 this.model 中，可以在任意中间件中访问
    * 例如在 "/user/login" 中访问stuff.js 中的login方法完成登陆验证，方式为 this.model.stuff.login(args)　　//(在中间件也就是 genorater function中)
* *Public*　　　　公共静态资源，图片等  
* *Setting*  　　　 配置文件  
    * 放置项目配置文件，如db.js等   

本项目是对*koa*的简单包装，便于快速开发 app 后台，使用时可直接拷贝本工程，并集中精力扩展 Router 中的控制逻辑和 Model 中的数据访问。
* Router 文件夹中
    * 路由从此目录开始直到文件中的函数名，经过的路径就是访问的路由，例如 "Router/admin/user.js" 中有个 login 函数，则其访问路由问 "/admin/user/login"。
    * 每一个文件中的 "index" 函数的访问路由可以不包含 "/index", 即路由最右端的 "index" 都用 "/" 替换了，例如 "/Router/user.js" 中的 "index" 函数的访问路由为 "/user/"。
* Model 文件夹中
    * 每个文件被转换为一个 model 对象，并自动绑定到 koa 中间件的 "this.model“ 中，在控制器中间件(Router文件夹中的某个函数)中可以随时访问，例如 "/user/login" 验证登陆是需要检查数据库中的数据与提供的参数是否一致，可以使用 "this.model.stuff.login(args)"， "stuff.login" 是Model文件夹中stuff.js中的一个函数。
  
    
      
        
          
             
             

 
