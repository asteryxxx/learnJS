var name ='小明'
var age = 22

function sum(num1,num2){
    return num1 + num2;
}

var flag = true
if(flag){
    console.log(sum(10,20));
}

// 解决方法1：使用匿名函数，es5的方法
/* var moduleA = (function(){ //模块的名字
    ... return obj
})()   //立即执行函数，返回Obj，所以moduleA =obj
 在全局里面就有moduleA,就有小明导出的东西
 别的文件就可以：if(moduleA.flag) 这样复用了
 */

 /* commonjs导出方式
在aaa.js结尾加上:module.exports = { flag,sum}
在另一个文件导入：var {flag,sum} = require('./aaa.js')  //对象的解构
如果你这样导入的话麻烦： var aaa = require('./aaa.js') ; var flag = aaa.flag

 */