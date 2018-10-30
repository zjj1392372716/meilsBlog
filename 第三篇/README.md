
# 封装与信息隐藏


**认识封装和信息隐藏**

封装是面向对象的基石。通过封装降低对象之间的耦合。

封装： 达到信息隐藏的技术。
信息隐藏： 是我们要达到的目的。

封装： 可以被定义为对对象内部数据表现形似和实现细节进行隐藏。要想访问封装好的数据，必须通过提供的相应方法来访问。

其他的面向对象语言如java，是通过关键字来说明某方法和属性被被隐藏。而js却不行，js中是通过`闭包`来创建只允许对象内部访问的属性和方法。



**接口扮演的角色**


接口记载着可供公用的方法的契约，如果把未在接口中申明的方法暴露出去，如果其他对象对并不属于接口的方法产生依赖，那么就会出现一定的安全性问题。


**创建对象的基本模式**

js中创建对象的基本方式有三种：`门户大开型对象` `````````

* 门户大开型对象

```js
/**
 * Book类
 * @param version
 * @param title
 * @param author
 * @constructor
 */
var Book = function (version, title, author) {
    if(version == undefined) {
        throw new Error('参数至少为一个哦');
    }

    this.version = version;
    this.title = title || "";
    this.author = author || "";
}

Book.prototype = {
    display: function () {
        // ..
        console.log('book')
    },
    checkVersion: function (ver) {
        // ..
        // if() {
        //    return false;
        // }
        return true;
    },
    getVersion: function () {
        return this.version;
    },
    getTitle: function () {
        return this.title;
    },
    getAuthor: function () {
        return this.author;
    },
    setVersion: function (v) {
        this.version = v;
    },
    setTitle: function (t) {
        this.title = t;
    },
    setAuthor: function (a) {
        this.author = a;
    }
}
var b = new Book('1.2.3', 'meilsbook', 'meils');
var flag = b.checkVersion(b.version);
if(flag) {
    b.display();
}
```

为了保护内部属性，我们设置了取值器和赋值器。还有一个检验方法，尽管这个设计方法也是蛮好的，但是他有一个重要的漏洞，
虽然我们设置了取值器和赋值器，但是属性仍然还是公开的，可以直接被设置，我们无法阻止这种行为。

但是它也有许多优点： 易于使用，快速上手。



* 用命名规范区别私有成员

使用命名规范模仿私有成员的模式。

```js
/**
     * Book类
     * @param version
     * @param title
     * @param author
     * @constructor
     */
    var Book = function (version, title, author) {
        if(version == undefined) {
            throw new Error('参数至少为一个哦');
        }

        this._version = version;
        this._title = title || "";
        this._author = author || "";
    }

    Book.prototype = {
        display: function () {
            // ..
            console.log('book')
        },
        checkVersion: function (ver) {
            // ..
            // if() {
            //    return false;
            // }
            return true;
        },
        getVersion: function () {
            return this._version;
        },
        getTitle: function () {
            return this._title;
        },
        getAuthor: function () {
            return this._author;
        },
        setVersion: function (v) {
            this._version = v;
        },
        setTitle: function (t) {
            this._title = t;
        },
        setAuthor: function (a) {
            this._author = a;
        }
    }
    var b = new Book('1.2.3', 'meilsbook', 'meils');
    var flag = b.checkVersion(b.version);
    if(flag) {
        b.display();
    }

```

以_开头的变量或者方法，我们约定其为私有变量或者私有方法。这种方法跟门户大开放型对象极其类似。

这种方法仍然存在一定的不足。


* 作用域、嵌套函数、闭包


先来认识一下这几个概念：

```
// 函数作用域
1. js只有函数作用域
2. 在函数内部申明的变量在外部是无法使用的,只能在函数内部被使用
3. 定义在一个函数中的变量仍然可以被其内部的内嵌函数使用
```

一个例子：

```js
var foo = function () {
    var a = 10;

    function bar() {
        // 内嵌函数可以访问私有变量
        a *= 2;
    }
    bar();
    return a;
}

console.log(foo()); // 20
```

```js
var foo = function () {
    var a = 10;
    
    // 内嵌函数使用了外部的私有变量，由于是词法作用域，即使外部函数执行完毕，但是由于内嵌函数使用了其私有变量，
    // 所以该私有变量会被保存下来，不会被销毁，这就是闭包了。
    // 【在foo返回这个函数后，他的作用域就被保存了下来，但是只有返回的这一个函数能访问它这个作用域，】
    function bar() {
        a *= 2;
        return a;
    }

    return bar;
}

var baz = foo(); //将bar的引用赋值给一个变量
console.log(baz()); // 20
console.log(baz()); // 40
console.log(baz()); // 80

var moz = foo();
console.log(moz()); // 20
console.log(moz()); // 40
console.log(moz()); // 80


// baz和moz各有这个作用域和a的一个副本。而且只有他们能够对其进行修改。
```

由于js的作用域是词法性的，存在词法上下文，且函数执行是在是在定义他们的作用域中而不是在调用他们的作用域中。

闭包最常用的手段就是返回一个内嵌函数。


```js
var Book = function (version, title, author) {
    // 私有变量
    // private var
    var version, title, author;

    // 私有方法
    // private method
    function checkversion(v) {

    }


    // 特权方法
    // 公有方法，能够访问私有属性和方法，为了能在对象外部访问，所以在前面添加了this关键字
    this.getVersion = function () {
        return version;
    }
    this.getTitle = function () {
        return title;
    }
    this.getAuthor = function () {
        return author;
    }
    this.setVersion = function (v) {
        version = v;
    }
    this.setTitle = function (t) {
        title = t;
    }
    this.setAuthor = function (a) {
        author = a;
    }

}

// 不需要直接访问私有属性和方法，通过公有方法来访问私有属性和方法。
Book.prototype.display = function () {
    console.log(this.getTitle());
}

var b = new Book('222', 'meilsbook', 'meils');
b.display();
```

弊端： 每生成一个对象，都会每一个私有变量和方法重新分配内存，这样会导致一些内存的浪费。所以只适合真正需要私有变量的场合。
同时也不适合产生派生类。因此如果你可能需要生成派生类，那最好采用前两种方法。


**创建对象的更高级的方法**

* 静态方法和属性

静态成员是在类层次上操作，而不是在类实例上进行操作的。每一个静态成员会只有一份。


```
对象.属性（实例属性），属于某个对象的属性

类.属性（静态属性），静态属性是所有对象公有的属性
```


**静态属性**

```js
var Person = function () {
    Person.count++;
}

// 静态属性
Person.count = 0;

var p1= new Person();
var p2= new Person();
var p3= new Person();

//静态属性跟随类来出现。只会出现一份
console.log(Person.count);
```

**静态方法**


```js
var Person = function () {
    Person.count++;
}

// 静态属性
Person.count = 0;
// 静态方法
Person.getCount = function () {
    console.log(Person.count);
}

var p1= new Person();
var p2= new Person();
var p3= new Person();

//静态属性跟随类来出现。只会出现一份
Person.getCount();
```


下面的案例比较全面。

```js
var Book = (function Book() {
    // private static attr
    var count = 0 ;


    // private static method
    function  checkVerson(v) {
        //...
    }

    return function (version, title, author) {

        // private attr
        var version, title, author;

        // privileged method
        this.getVersion = function () {
            return version;
        }
        this.getTitle = function () {
            return title;
        }
        this.getAuthor = function () {
            return author;
        }
        this.setVersion = function (v) {
            // if(!checkVerson(v)) {
            //     throw new Error('版本号错误！');
            // }
            version = v;
        }
        this.setTitle = function (t) {
            title = t;
        }
        this.setAuthor = function (a) {
            author = a;
        }

        this.setTitle(title);
        this.setAuthor(author);
        this.setVersion(version);
    }

    count++;
})();

// public staitc method
Book.staticM = function () {

}

// public method
Book.prototype.display = function () {
    console.log(this.getTitle());
    return this;
}

var b = new Book('2.0', 'meilsbook', 'book');;
b.display();
```


**常量**

```js
var Class = (function () {
    // private 常量
    var DATA_NUM = 100;

    // 构造函数
    var ctr = function (arg) {
        
    }

    // 保护的静态方法
    ctr.getDefine = function () {
        // 获得常量
        return DATA_NUM;
    }


    return ctr; // 返回构造函数
})();

var c = new Class();
console.log(Class.getDefine());

```


* 我们学到的应该是： 使用闭包来创建受保护的变量空间。通过这种方法来封装一些工具类，以方便我们在接下来的开发中的方便。









