
> js设计模式 第一篇 

## js的灵活性


js 有着诸多变成模式，你既可以使用过程式编程、函数式编程、也可以面向对象编程。

* 如果你习惯于过程式编程,可以是

```$xslt

function startAnimation() {
    //...
}

function endAnimation() {
    //...
}
```

* 如果你使用面向对象编程

```$xslt
// class
// 定义一个动画类
// 好处： 可以维护一些内部状态，并且具有一些仅可以对内部状态进行操作的方法
var Animation = function () {
    // ...
}

Animation.prototype.start = function () {
    // ...
}

Animation.prototype.end = function () {
    // ...
}
```

* 对上诉方法再进行升级,把类的定义封装再一条申明中

```$xslt
// 把类的定义封装再一条申明中
var Animation = function () {
    // ...
}
Animation.prototype = {
    start: function () {

    },
    end: function () {
        
    }
}
```

* 另外一种高级的用例

```$xslt

// 为Function 添加一个method方法

var Animation = function () {
    // ...
}

Function.prototype.method = function (name, fn) {
    this.prototype[name] = fn;
    return this;
    //可以链式调用哦
}
Animation.method('start', function () {
    // ...
})
Animation.method('end', function () {
    // ...
})
```

> 同一个问题，你可以有不同的方法来解决，就像上面一样，使用了4中不同的方法。


------------

## 弱类型

三种原始类型： 数值Number、字符串string、布尔Boolean。

js不区分整形和浮点型，是其于绝大多数语言不同的一个关键点之一。

还有对象类型和包含可执行代码的函数类型。以及null、undefind类型。



弱类型语言中。变量是根据其赋值的类型来决定的。`原始类型`之间可以进行类型的转换。

1. toString() 可以将数值类型和boolean类型转换为字符串类型。
2. parseInt() parseFloat()可以将字符串类型转换为数值类型。
3. 双重非操作，可以把字符串或者数值类型转换为boolean类型。


```$xslt
var str = "";
var d = !!str; // false

var num = 10;
var bool = !!num; // true

var num0 = 0;
var b = !!num0; // false
```


------------

## 函数是一等公民

函数可以是：

```$xslt
1. 赋值给变量
2. 当作参数传递
3. 当作返回值
4. 构造函数
```

函数具有很强的灵活性。

```$xslt
// 一个自执行的匿名函数，且仅执行一次

(function() {
 // ...
})();


// 可以传入参数
(function(a,b) {
    return a*b;
})(10,2);

(function($) {
    return a*b;
})(jQuery);


// 可以将返回值赋值给一个参数,将返回值保存在一个变量里面。
var baz = (function() {
    // ...
})();


```

* 函数具有函数作用域，外部无法访问函数内部的变量

* js的作用域具有词法特性。因此函数是运行在定义它的作用域中，而不是在调用它的作用域中。

## js 对象的易变性



js中一切都是对象，除了那三种原始类型，即便是这三种原始类型，在必要的时候也可以包装为对象。

js 中对象的易变性是指，任何对象都可以被添加新的属性。

```$xslt
function display(){
    // 
}
display.num = 0;



var person = function() {
    // 
}

var p = new person();
p.display = function(){
    // ...
}
```


