
# 单体模式

> 单体 ： 是一个用来划分命名空间，并将一批属性和方法包装起来的一个对象。如果可以被实例化，那么也只能被实例化一次。

## 基本结构

```
// 对象字面量的形式创建
var MainPage = {
    attr1: "1",
    attr2: "2",
    method1: function () {

    },
    method2: function () {

    }
}
```

依赖于对象的可扩展性和易变性，所以我们可以使用这种方法来尽可能的减少全局变量。因为这些属性和方法被单体对象圈在了一个命名空间中。


命名空间的名字：我们应该尽量能说明其用途。

单体模式最常使用在项目中，比如我们可以把我们写的方法和属性都放于一个全局对象中，这样可以防止全局变量的污染。概率极低吧，而且这样也方便别人阅读你的代码。


* 如果想要让其拥有自己的私有方法： 1， 使用下划线开头的命名方式 2、使用闭包


**创建单体**

> 1、对象字面量

```js
var MainPage = {};
MainPage.init ={
    _inAttr:0,
    _inMethod:function(){
        //...
    },
    pubAttr1: 1,
    pubAttr2: 2,
    pubMethod1:function(){
        console.log(this._inAttr);
    },
    pubMethod2: function(){
        this._inMethod();
    }
}


MainPage.init.pubMethod1();

```


> 2、闭包



```js
var MainPage = {};
MainPage.init = function(){
    //  内部私有的方法和属性
    var inAttr = 0;
    var inMethod = function(){
        //...
    }

    // 公有的属性和方法
    return {
        pubAttr1: 1,
        pubAttr2: 2,
        pubMethod1:function(){
        console.log(inAttr);
        },
        pubMethod2: function(){}
    };
}();


MainPage.init.pubMethod1();
我们可以把公有成员和属性放入返回的这个单体对象中。
```

这两中方式看似没什么差异。但是第二种方法却是的其内部能够添加真正的私有成员和函数。任何声明在该匿名函数中的成员和属性都只能被声明在同一个闭包中的其他函数所访问。

这个闭包函数执行之后，依然还存在，所以其内部声明的成员或这属性都能被返回的那些方法所使用。






