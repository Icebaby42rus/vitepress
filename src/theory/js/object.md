## Основы

Объекты – это ассоциативные массивы с рядом дополнительных возможностей.

Они хранят свойства (пары ключ-значение), где:

<ul>
<li>Ключи свойств должны быть строками или символами (обычно строками).</li>
<li>Значения могут быть любого типа.</li>
</ul>

Чтобы получить доступ к свойству, мы можем использовать:

<ul>
<li>Запись через точку: <code>obj.property</code>.</li>
<li>Квадратные скобки <code>obj["property"]</code>. Квадратные скобки позволяют взять ключ из переменной, например, <code>obj[varWithKey]</code>.</li>
</ul>

```js
let fruit = prompt("Какой фрукт купить?", "apple");

let bag = {
  [fruit]: 5, // имя свойства будет взято из переменной fruit
};

alert( bag.apple ); // 5, если fruit="apple"
```

Дополнительные операторы:

<ul>
<li>Удаление свойства: <code>delete obj.prop</code>.</li>
<li>Проверка существования свойства: <code>"key" in obj</code>.</li>
<li>Перебор свойств объекта: цикл for <code>for (let key in obj)</code>.</li>
</ul>

## Копирование объектов и ссылки

Одно из фундаментальных отличий объектов от примитивов заключается в том, что объекты хранятся и копируются «по ссылке», тогда как примитивные значения: строки, числа, логические значения и т.д. – всегда копируются «как целое значение».

**Переменная, которой присвоен объект, хранит не сам объект, а его «адрес в памяти» – другими словами, «ссылку» на него.**

**При копировании переменной объекта копируется ссылка, но сам объект не дублируется.**

```js
let user = { name: "John" };
let admin = user; // копируется ссылка
```

Теперь у нас есть две переменные, каждая из которых содержит ссылку на один и тот же объект:

```js
let user = { name: 'John' };
let admin = user;

admin.name = 'Pete'; // изменено по ссылке из переменной "admin"

alert(user.name); // 'Pete', изменения видны по ссылке из переменной "user"
```

<p>Это как если бы у нас был шкафчик с двумя ключами, и мы использовали один из них (<code>admin</code>), чтобы войти в него и внести изменения. А затем, если мы позже используем другой ключ (<code>user</code>), мы все равно открываем тот же шкафчик и можем получить доступ к изменённому содержимому.</p>

### Сравнение по ссылке

Два объекта равны только в том случае, если это один и тот же объект.

<p>Например, здесь <code>a</code> и <code>b</code> ссылаются на один и тот же объект, поэтому они равны:</p>

```js
let a = {};
let b = a; // копирование по ссылке

alert( a == b ); // true, обе переменные ссылаются на один и тот же объект
alert( a === b ); // true
```

```js
let a = {};
let b = {}; // два независимых объекта

alert( a == b ); // false
```

## Клонирование и объединение, Object.assign

Для клонирования объекта можно использовать метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/assign">Object.assign</a>

```js
Object.assign(dest, [src1, src2, src3...])
```

<ul>
<li>Первый аргумент <code>dest</code> — целевой объект.</li>
<li>Остальные аргументы <code>src1, ..., srcN</code> (может быть столько, сколько необходимо) являются исходными объектами</li>
<li>Метод копирует свойства всех исходных объектов <code>src1, ..., srcN</code> в целевой объект <code>dest</code>.  Другими словами, свойства всех аргументов, начиная со второго, копируются в первый объект.</li>
<li>Возвращает объект <code>dest</code>.</li>
</ul>

Например, мы можем использовать его для объединения нескольких объектов в один:

```js
let user = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// копируем все свойства из permissions1 и permissions2 в user
Object.assign(user, permissions1, permissions2);
// теперь user = { name: "John", canView: true, canEdit: true }
```

Если скопированное имя свойства уже существует, оно будет перезаписано:

```js
let user = { name: "John" };
Object.assign(user, { name: "Pete" });
alert(user.name); // теперь user = { name: "Pete" }
```

<p>Мы также можем использовать <code>Object.assign</code> для замены цикла <code>for..in</code> для простого клонирования:</p>

```js
let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);
```

## Вложенное клонирование

- <p>Мы можем реализовать глубокое клонирование, используя рекурсию. Или, чтобы не изобретать велосипед заново, возьмите готовую реализацию, например <a href="https://lodash.com/docs#cloneDeep">_.cloneDeep(obj)</a> из библиотеки JavaScript <a href="https://lodash.com">lodash</a>.</p>

- <p>Также мы можем использовать глобальный метод <a href="https://developer.mozilla.org/en-US/docs/Web/API/structuredClone">structuredClone()</a>, который позволяет сделать полную копию объекта. К сожалению он поддерживается только современными браузерами. <a href="https://caniuse.com/?search=structuredClone">Здесь</a> можно ознакомиться с поддержкой этого метода.</p>Однако следует отметить, что structuredClone выдает ошибку при клонировании узлов DOM. Также, если ваш объект содержит функции, они будут удалены из результата.

- Метод <code>JSON.stringify</code> позволяет нам передать объект в первом аргументе для преобразования в строковый формат. Как только мы преобразовали наш объект в строку, мы можем взять эту строку и преобразовать ее обратно в исходный объект, используя метод <code>JSON.parse</code>.

Однако, поскольку JSON поддерживает только ограниченное подмножество типов данных в JavaScript (такие, как логические значения, строки, массивы и т. д.), такие вещи, как Date или Maps, не будут правильно преобразованы при создании клона, если не предпринять дополнительных шагов для преобразования несовместимых значений в объекте сначала во что-то, что может понять JSON, а затем обратно в желаемый тип данных.



## Object.keys, values, entries

Для простых объектов доступны следующие методы:

<ul>
<li><a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/keys">Object.keys(obj)</a> – возвращает массив ключей.</li>
<li><a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/values">Object.values(obj)</a> – возвращает массив значений.</li>
<li><a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries">Object.entries(obj)</a> – возвращает массив пар <code>[ключ, значение]</code>.</li>
</ul>

<p>Обратите внимание на различия (по сравнению с <code>map</code>, например):</p>

<table>
<thead>
<tr>
<th></th>
<th>Map</th>
<th>Object</th>
</tr>
</thead>
<tbody>
<tr>
<td>Синтаксис вызова</td>
<td><code>map.keys()</code></td>
<td><code>Object.keys(obj)</code>, не <code>obj.keys()</code></td>
</tr>
<tr>
<td>Возвращает</td>
<td>перебираемый объект</td>
<td>«реальный» массив</td>
</tr>
</tbody>
</table>

<p>Почему так? Основная причина – гибкость. Помните, что объекты являются основой всех сложных структур в JavaScript. У нас может быть объект <code>data</code>, который реализует свой собственный метод <code>data.values()</code>. И мы всё ещё можем применять к нему стандартный метод <code>Object.values(data)</code>.</p>

<p>Второе отличие в том, что методы вида <code>Object.*</code> возвращают «реальные» массивы, а не просто итерируемые объекты. Это в основном по историческим причинам.</p>

```js
let user = {
  name: "John",
  age: 30
};

// Object.keys(user) = ["name", "age"]
// Object.values(user) = ["John", 30]
// Object.entries(user) = [ ["name","John"], ["age",30] ]
```

## Трансформации объекта

<p>У объектов нет множества методов, которые есть в массивах, например <code>map</code>, <code>filter</code> и других.</p>

<p>Если мы хотели бы их применить, то можно использовать <code>Object.entries</code> с последующим вызовом <code>Object.fromEntries</code>:<div></div></p>

<ol>
<li>Вызов <code>Object.entries(obj)</code> возвращает массив пар ключ/значение для <code>obj</code>.</li>
<li>На нём вызываем методы массива, например, <code>map</code>.</li>
<li>Используем <code>Object.fromEntries(array)</code> на результате, чтобы преобразовать его обратно в объект.</li>
</ol>

Например, у нас есть объект с ценами, и мы хотели бы их удвоить:

```js
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // преобразовать в массив, затем map, затем fromEntries обратно объект
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
```
