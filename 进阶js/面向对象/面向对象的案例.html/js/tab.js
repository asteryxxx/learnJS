var that;
class Tab{
    constructor(id){
        that = this;
        //根据id获取相对应的元素
        this.main = document.querySelector(id)
        this.lis = this.main.querySelectorAll("li")
          //上面的标题是li,下面的内容是section
        this.sections = this.main.querySelectorAll("section")
        this.fsection = this.main.querySelector(".tabscon")
        //获取加号按钮，添加点击事件
        this.add = this.main.querySelector(".tabadd")
        //添加的时候Li的父亲ul↓↓
        this.ul = this.main.querySelector(".fisrstnav ul:first-child")
        //获取所有的删除按钮
        this.removes = this.main.querySelectorAll(".icon-guanbi")

        this.init();//最好一new对象就初始化,init放在最后面哦，不然其他地方可能会获取到undefined
    }
    //当页面一刷新，绑定事件
    init(){
        this.updateNode()
        //给加号按钮绑定事件
        this.add.onclick = this.addTab;
        //初始化让相关的元素绑定事件
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            // 给每个li添加索引号的属性↑↑
            this.lis[i].onclick = this.toggleTab
            this.removes[i].onclick = this.removeTab
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    } 
     //因为动态添加元素的，所以也要动态获取所有的新添加的
     updateNode(){
         this.sections = this.main.querySelectorAll("section")
         this.lis = this.main.querySelectorAll("li")
         this.removes = this.main.querySelectorAll(".icon-guanbi")
         //找到所有li的第一个span的
         this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child")
     }
    //1、切换功能
    toggleTab(){
        console.log('我被点击了父亲，冒泡到我这里了');
        //是先清除所有人的样式，再给我自己加样式，然后当前就只有我展示了
        that.clearClass();
         //给当前对象设置一个class属性
       this.className = 'liactive'
      //  this.sections[this.index].className = 'conactive' 不对，因为li没有sections
        //可以用全局变量取到sections
        that.sections[this.index].className = 'conactive'
        
    }
    //清除li和sections的样式
    clearClass(){
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = "";
            this.sections[i].className = "";
        }
    }
  

    //2、添加功能
    addTab(){
        that.clearClass()
        //要记得清除样式
        var random =Math.random();
        //（1）创建li元素和sections，insertadjacenthtlm可以把字符串格式添加到父元素中
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
        //获取父元素,追加到父元素
        that.ul.insertAdjacentHTML("beforeend",li)
        //追加下面的内容
        var section = '<section class="conactive">新添加的内容'+random+'</section>'
        that.fsection.insertAdjacentHTML("beforeend", section)
        //新增的选项卡没有切换功能，没有之前的功能。是后来的孩子
        that.init();//在初始化一下，重新给所有的添加事件
    }
    //3、删除
    removeTab(e){
        e.stopPropagation();
        //思路：点击x号可以删除这个索引号对应的li和section
        var index = this.parentNode.index;
        //当前点击的remove没有索引,他的父亲li有索引号
        //但是当你点击叉叉时，会冒泡到li父亲，他也有点击事件，我们并不想这样，我们只是想关闭
        //需要阻止冒泡,防止触发li的切换点击事件
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init()
        //删除完也要获取最新的元素

        //当我们删除的不是选中状态的li时候，原来选中的li状态保持不变。
        if (document.querySelector(".liactive")){
            //有这个类代表是当前选中
            return;//下面的代码不再执行
        }//如果刚好删的是选中，上面已经删除了，所以肯定不存在这个类，就不会进到if判断

        //当我们删除当前元素，让前一个li处于选定状态,手动触发点击事件getElementById('myId').click();
        index--;
        //手动调用点击事件
        that.lis[index]&& that.lis[index].click();
        //弄个&&的符号，如果index 为-1，为false 就不会触发点击事件
    
        //如果我们处于测试4，但是删掉测试2，应该保持处于测试4更友好点
    }

    //双击文字，会默认选中文字，还需要禁止选中文字
    // 双击文字的时候，在里面生成一个文本框，当失去焦点或者按下回车键时，然后把新的
    // 文本内容赋值给原先的元素
    editTab(){
        //编辑修改功能
        var str =this.innerHTML
        //获取原来的内容

        //还需要禁止选中文字↓↓↓
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      //双击文字的时候，在里面生成一个文本框
        this.innerHTML ='<input type="text"/>'
        var input = this.children[0]
        input.select();//文本框的文字处于选中状态
        input.value = str;
        //当离开文本框，就把文本框的值给span
        input.onblur = function (){
            //input = this. 所以他的父亲就是span
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function (e){
            if(e.keyCode === 13){
                this.blur()
                //手动调用表单失去焦点事件，不需要移动鼠标离开
            }
        }
    }
}

new Tab('#tab');