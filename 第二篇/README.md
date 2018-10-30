
# 接口

-----

**接口的定义**

接口提供了一种方法说明某一个对象应该具有哪些方法的手段。

接口可以告诉一个程序员，一个类实现了哪些方法，帮助其使用该类，促进该类的重用。最大的不足之处在于，你不能强迫程序员去遵循你定义的接口。

------


## js中模仿接口实现


**一、注释法是**

这种方式的优点：简单明了，给程序员一个参考，程序员可以参考模板继续往下添加方法
缺点:         通过注释来声明，这个属于文档规范的范畴，需要程序员严格遵守约定

```
/**
 * interface Composite{
 *     function add() {}
 *     function remove() {}
 * }
 *
 * interface FormItem {
 *     function save() {}
 * }
 */

var CompositeForm = function () {
    
}

CompositeForm.prototype.add = function () {
    
}

CompositeForm.prototype.remove = function () {
    
}

CompositeForm.prototype.save = function () {
    
}

// 再来
/**java实现形式
 * public interface Walkable {
 *        public void walk();
 * }
 *
 * public interface Fightable {
 *        public void fight();
 * }
 */
var Knight = function(name) {
    this.name = name;
    //Knight实现了Walkabe和Fightable
};
Knight.prototype.walk = function() {
    alert(this.name+" is walking!");
};
Knight.prototype.fight = function() {
    alert(this.name+" is fighting!");
};
var k = new Knight("jay");
k.fight();
```


**二、用属性检测模仿接口**

这种方式的优点：实现了检查接口是否完全被实现
缺点：这种属于文档的范畴，但接口的方法未检测，如果只是申明了，并没有实现同样还是起不到太大的效果。


```
var Knight = function(name) {
    this.name = name;
    //implementInterfaces是固定的(说明实现了那些对象)
    this.implementInterfaces=["Walkable","Fightable"];
};
Knight.prototype.walk = function() {
    alert(this.name+" is walking!");
};
Knight.prototype.fight = function() {
    alert(this.name+" is fighting!");
};


//检查是否实现了上面定义的this.implementInterfaces=["Walkable","Fightable"]接口数组
function CheckKnight(obj) {
    if(!isImplements(obj,"Fightable","Walkable")) throw new Error("必须实现Fightable和Walkable两个接口！");
};


function isImplements(obj) {
    //obj为要验证得对象(如果没有实现的接口,就不让它验证)
    if(!obj.implementInterfaces) throw new Error("必须声明所需要实现的接口");
    //每一个方法中都存在一个对象arguments来存储传递进来的实际参数
    //除了第一个以外,其他为实现了接口对象
    for(var i=1;i<arguments.length;i++) {
        //判断参数是否为String
        if(typeof arguments[i]!="string") throw new Error(arguments[i]+"的类型不正确");
        var found = false;
        //obj.implementInterfaces.length是上面定义的接口数组
        for(var j=0;j<obj.implementInterfaces.length;j++) {
            var inter = obj.implementInterfaces[j];
            //只要找到相同的字符串就代表实现了相应接口
            if(inter==arguments[i]) {
                found = true;
                break;
            }
        }
        //只要isImplements(obj,"Fightable","Walkable")
        // 后面的字符串(接口对象)有一个没有实现就报错
        if(!found) return false;
    }
    return true;
};
var k = new Knight("zyd");
CheckKnight(k);
k.walk();
```

**三、用鸭式辨型模仿接口**

鸭式辨型： "只要像鸭子一样走路和嘎嘎叫的就是鸭子。"

某个类是否声明自己支持哪些接口并不重要，只要它具有接口中的这些方法就行。这种方法就比较合理一些了。


* 第一步 定义接口类

```js
/**
 * 接口类
 * @param name
 * @param method
 */
var Interface = function (name, method) {
    if(arguments.length != 2) {
        throw new Error('创建的接口对象参数必须为两个,第二个为方法数组')
    }
    this.name = name;
    this.method = [];


    for(var i = 0; i < method.length ; i++) {
        if (typeof method[i] != "string") {
            throw new Error('参数必须是string')
        }

        this.method.push(method[i]);
    }
}
//  接口类的静态方法 —— 检查一个对象是否满足接口
Interface.checkImplement = function (obj) {
    if(arguments.length < 2) {
        throw new Error('参数错误，第一个参数为一个对象，之后的参数为接口对象，至少为两个对象');
    }

    for(var i = 1; i < arguments.length; i++) {
        var arginterfaceobj = arguments[i]; // 接口对象
        for(var j = 0; j < arginterfaceobj.method.length; j++) {
            var methodName = arginterfaceobj.method[j];

            if(typeof obj[methodName] != "function" || !obj[methodName]) {
                throw new Error('有接口的方法没实现')
                return false;
            }
        }
    }

    return true;

}
```

* 第二步 实例化接口类

```js
var interface1 = new Interface('interface1', ['add', 'update']);
```


* 第三步 测试

```js
/**
 * Obj测试类
 */
var Obj = function () {
    //...
}

Obj.prototype.add = function () {
    //..
}
Obj.prototype.update = function () {
    //..
}

var o = new Obj(); //实例化
var flag = Interface.checkImplement(o, interface1); // 测试是否符合接口
if(flag) {
    console.log('接口全部实现了');
} else {
    console.log('存在为实现的积极呀');
}
```






