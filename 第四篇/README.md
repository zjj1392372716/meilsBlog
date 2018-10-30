# 继承

js中的继承比其他的面向对象语言实现起来要麻烦一些。它们有extend关键字。js中使用的是原型式继承。


## 为什么我们要使用继承

> 假设你需要一个toString的方法，一种方法，你可以给全部类都添加一个这个方法，另一种方法是创建一个toStringProvider的类，
让每一个别的类都继承它。但是唯一不足之处在于类于类之间产生了强耦合的关系。不过我们会使用笔的方法来避免这些。


## 一、类式继承


```js
var Person = function(name) {
    this.name = name;
}

Person.prototype.getName = function() {
  return this.name;
}

var p = new Person('zjj');
p.getName();
```


简单的使用new关键字就可以创建一个实例对象。然后它就可以访问所有的实力属性和实力对象。


## 原型链


```js
// 超类
var Person = function(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
}

var p = new Person('zjj');
p.getName();


// 子类
function Author(name, books) {
    // 调用超类，将name传入
    // 【1】 第一步，对象冒充继承，缺点是没法继承原型链上的属性和方法
    Person.call(this, name);

    this.books = books;
}

// 设置原型链
// 【2】 第二步 原型链继承，缺点是实例化后没法向父类传参数
// 【3】 所以我们一般采用第一步+第二步的方式，这样更完美
Author.prototype = new Person();
// 由于设置了prototype之后，constructor被抹除了，所以需要在设置一遍。
Author.prototype.constructor = Author;
Author.prototype.getBooks = function() {
    return this.books;
}

var a = new Author('zjjs', 'meils');
console.log(a.getName());
console.log(a.getBooks());
```


**es6的类实现与继承**

```js
/**
 * es6 的类实现已经静态方法
 * 
 */
class Person{
    constructor(name, age) {
        // 实例属性
        this._name = name;
        this._age = age;

    }
    // 实例方法
    getName() {
        return this._name;
    }

    getAge() {
        return this._age;
    }
}

// var p = new Person('zjj', 23);
// alert(p.getName());


// 继承
class Web extends Person{
    
    constructor(name, age, sex) {
        // 实例属性
        super(name, age);
        this._sex = sex;
    }
    // 实例方法
    pring() {
        console.log(this._sex);
    }
    // 静态方法
    static say() {
        console.log('静态方法');
    }

}

var c = new Web('zjj', 23, 'boy');
c.getName();
c.pring();
Web.say();
```


## extend函数

我们自己封装一个用于继承的函数。

```js
/**
 * 继承类
 * @param superClass
 * @param subClass
 */
function extend(superClass, subClass) {
    var F = function () {}
    F.prototype = superClass.prototype;
    subClass.prototype  = new F();
    subClass.prototype.constructor = subClass;
}

function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    console.log(this.name);
}

function Web(name, age) {
    // 【* 这里耦合度比较高 *】 
    Person.call(this, name);
    this.age = age;
}

extend(Person, Web);

var w = new Web('zjj');
w.getName();

var p = new Person('zjjj');
p.getName();

```


一种降低耦合度的解决办法

```js
/**
 * 继承类
 * @param superClass
 * @param subClass
 */
function extend(superClass, subClass) {
    var F = function () {}
    F.prototype = superClass.prototype;
    subClass.prototype  = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor == Object.prototype.constructor){
        superClass.prototype.constructor = superClass;
    }
}

function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    console.log(this.name);
}

function Web(name, age) {
    Web.superclass.constructor.call(this, name);
    this.age = age;
}

extend(Person, Web);

var w = new Web('zjj');
w.getName();
var p = new Person('zjjj');
p.getName();
```


## 二、原型式继承


原型式继承于类继承存在很大的不同，它使用的是原型链的特性。

```js
// 一个person对象，字面量的形式创建
var Person = {
    name: 'meils',
    getName: function () {
        return this.name;
    }
};

// 继承函数
function clone(object) {
    var F = function() {};
    F.prototype = object;
    return new F();
}

// 继承
var Student = clone(Person);


console.log(Student.getName()); // meils
Student.name = "mf";
console.log(Student.getName()); // mf
```

原型链继承并不需要类，只涉及对象。

比如上面的例子： 
我们创建了Person对象，它是我们想要创建的其他各种【类Person对象】的原型对象。

Person提供了共同的属性和方法。

clone方法用来创建类Person对象。会返回一个新的对象，这个对象的原型是Person对象。


```js
// 一个person对象，字面量的形式创建
var Person = {
    name: 'meils',
    getName: function () {
        console.log(this.name);
    }
};

// 继承函数
function clone(object) {
    var F = function() {};
    F.prototype = object;
    return new F();
}

var arr = [];


arr[0] = clone(Person);
arr[0].name = "no1";
arr[0].getName(); // no1
arr[0].job = "STUDENT";

arr[1] = clone(Person);
arr[1].getName(); // meils
arr[1].name = "no2";
console.log(arr[1].job); // undefined
arr[1].getName(); // no2

```


每一个实例都有一份自己的name副本，如果你没有为其特意赋值，或者改变。得到的就是最初的person对象的属性和方法。



> 类继承和原型式继承的比较

* 原型继承： 有较高的内存使用效率，这是因为他们会共享那些未被改动的属性和方法。而且形式简单。

* 类继承： 内存相对使用较多，子类派生过程比较复杂，可以用extend函数封装来。


-------------


## 二、掺元类

如果把一个函数用到多个类中，可以通过扩充的方式让，这些类共享该函数。

先创建一个包含各种通用方法的掺元类。其存在的目的就是为其他类提供公共函数。

```js
function augment(receivingClass, givingClass) {
    for(var key in givingClass.prototype) {
        if(!receivingClass.prototype[key]) {
            receivingClass.prototype[key] = givingClass.prototype[key];
        }
    }
}

// 掺元类
var Mixin = function () {};

Mixin.prototype.serilize = function () {
    var output = [];
    for(var key in this) {
        output.push(key + ':' + this[key]);
    }

    return output.join(',');
}


function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    console.log(this.name);
}

augment(Person, Mixin);

var p = new Person('zjj');

console.log(p.serilize());
```














