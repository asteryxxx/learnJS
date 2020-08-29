function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer)

    var current = parseInt(getStyle(obj, attr))
    //获取box1的原来的left值,因为上面是定位了，可以直接获取left
    //parseInt("10px") 会得到10，px不会得到，他不是合法数字 】这是重点，parseInt只会转换合法数字
    if (current > target) {//如果current为800，target为0，，为负值
        speed = -speed//此时速度为负值
    }
    //判断speed正负
    //如果从0到800移动，speed必须是正的
    //获取元素的目前位置
    obj.timer = setInterval(() => {
        var oldValue = parseInt(getStyle(obj, attr))

        //在旧的基础上增加
        var newValue = oldValue + speed;

        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        //向左移动时，需要判断newValue是否小于target
        //向右移动时，需要判断newValue是否大于target
        //如果speed是正数就向右移动
        obj.style[attr] = newValue + 'px'
        //当元素移动到800px时，停止
        if (newValue == target) {
            clearInterval(obj.timer);
            callback && callback();//只会执行一次回调
            //如果有传回调函数就执行，没有就不执行
        }
    }, 10)
}
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        //正常浏览器的方式，具有getComputedStyle()方法
        return getComputedStyle(obj, null)[name];
    } else {
        //IE8的方式，没有getComputedStyle()方法
        return obj.currentStyle[name];
    }
}