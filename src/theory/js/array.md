## Определение

Массив – это особый тип объекта, предназначенный для работы с упорядоченным набором элементов.

```js
// квадратные скобки (обычно)
let arr = [item1, item2...];
// new Array (очень редко)
let arr = new Array(item1, item2...);
```

<p>Вызов <code>new Array(number)</code> создаёт массив с заданной длиной, но без элементов.</p>

<ul>
<li>Свойство <code>length</code> отражает длину массива или, если точнее, его последний цифровой индекс плюс один. Длина корректируется автоматически методами массива.</li>
<li>Если мы уменьшаем <code>length</code> вручную, массив укорачивается.</li>
</ul>

## Получение элементов:

<ul>
<li>Мы можем получить элемент по его индексу, например <code>arr[0]</code>.</li>
<li>Также мы можем использовать метод <code>at(i)</code> для получения элементов с отрицательным индексом, для отрицательных значений <code>i</code>, он отступает от конца массива. В остальном он работает так же, как <code>arr[i]</code>, если <code>i &gt;= 0</code>.</li>
</ul>

## Добавление/удаление элементов:

Мы можем использовать массив как двустороннюю очередь, используя следующие операции:

<ul>
<li><code>push(...items)</code>добавляет <code>items</code> в конец массива.</li>
<li><code>pop()</code> удаляет элемент в конце массива и возвращает его.</li>
<li><code>shift()</code> удаляет элемент в начале массива и возвращает его.</li>
<li><code>unshift(...items)</code> добавляет <code>items</code> в начало массива.</li>
</ul>

### splice

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/splice">arr.splice</a> – это универсальный «швейцарский нож» для работы с массивами. Умеет всё: добавлять, удалять и заменять элементы.</p>

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

<p>Он изменяет <code>arr</code> начиная с индекса <code>start</code>: удаляет <code>deleteCount</code> элементов и затем вставляет <code>elem1, ..., elemN</code> на их место. Возвращает массив из удалённых элементов.</p>

<img src="/assets/images/theory/js/array1.png" alt=""/>

### slice

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/slice">arr.slice</a> намного проще, чем похожий на него <code>arr.splice</code>.</p>

```js
arr.slice([start], [end])
```

<p>Он возвращает новый массив, в который копирует все элементы с индекса <code>start</code> до <code>end</code> (не включая <code>end</code>). <code>start</code> и <code>end</code> могут быть отрицательными, в этом случае отсчёт позиции будет вестись с конца массива.</p>

<p>Это похоже на строковый метод <code>str.slice</code>, но вместо подстрок возвращает подмассивы.</p>

```js
let arr = ["t", "e", "s", "t"];
alert( arr.slice(1, 3) ); // e,s (копирует с 1 до 3)
alert( arr.slice(-2) ); // s,t (копирует с -2 до конца)
```

<p>Можно вызвать <code>slice</code> без аргументов: <code>arr.slice()</code> создаёт копию <code>arr</code>. Это часто используют, чтобы создать копию массива для дальнейших преобразований, которые не должны менять исходный массив.</p>

### concat

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/concat">arr.concat</a> создаёт новый массив, в который копирует данные из других массивов и дополнительные значения.</p>

```js
arr.concat(arg1, arg2...)
```

Он принимает любое количество аргументов, которые могут быть как массивами, так и простыми значениями.

```js
let arr = [1, 2];

// создать массив из: arr и [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// создать массив из: arr и [3,4] и [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// создать массив из: arr и [3,4], потом добавить значения 5 и 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

## Перебор массивов

Чтобы пройтись по элементам массива:

<ul>
<li><code>for (let i=0; i&lt;arr.length; i++)</code> – работает быстрее всего, совместим со старыми браузерами.</li>
<li><code>for (let item of arr)</code> – современный синтаксис только для значений элементов (к индексам нет доступа).</li>
<li><code>for (let i in arr)</code> – никогда не используйте для массивов!</li>
</ul>

###  forEach

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach">arr.forEach</a> позволяет запускать функцию для каждого элемента массива.</p>

```js
arr.forEach(function(item, index, array) {
  // ... делать что-то с item
});
```

## Поиск в массиве

### indexOf/lastIndexOf и includes

<p>У методов <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf">arr.indexOf</a> и <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/includes">arr.includes</a> одинаковый синтаксис и они делают по сути то же самое, что и их строковые аналоги, но работают с элементами вместо символов:</p>

<ul>
<li><code>arr.indexOf(item, from)</code> ищет <code>item</code> начиная с индекса <code>from</code> и возвращает номер индекса, на котором был найден искомый элемент, в противном случае <code>-1</code>.</li>
<li><code>arr.includes(item, from)</code> ищет <code>item</code> начиная с индекса <code>from</code> и возвращает <code>true</code>, если поиск успешен.</li>
</ul>

<p>Обычно эти методы используются только с одним аргументом: искомым <code>item</code>. По умолчанию поиск ведется с начала.</p>

```js
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

<p>Методы используют строгое сравнение <code>===</code>. Таким образом, если мы ищем <code>false</code>, он находит именно <code>false</code>, а не ноль.</p>

<p>Если мы хотим проверить наличие элемента в массиве и нет необходимости знать его индекс, предпочтительно использовать <code>arr.includes</code>.</p>

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf">arr.lastIndexOf</a> похож на <code>indexOf</code>, но ищет справа налево.</p>

### find и findIndex/findLastIndex

Если есть массив объектов, то для поиска объекта пригодится метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/find">arr.find</a>

```js
let result = arr.find(function(item, index, array) {
  // если true - возвращается текущий элемент и перебор прерывается
  // если все итерации оказались ложными, возвращается undefined
});
```

Функция вызывается по очереди для каждого элемента массива:

<ul>
<li><code>item</code> – очередной элемент.</li>
<li><code>index</code> – его индекс.</li>
<li><code>array</code> – сам массив.</li>
</ul>

<p>Если функция возвращает <code>true</code>, поиск прерывается и возвращается <code>item</code>. Если ничего не найдено, возвращается <code>undefined</code>.</p>

```js
let users = [
  {id: 1, name: "Вася"},
  {id: 2, name: "Петя"},
  {id: 3, name: "Маша"}
];

let user = users.find(item => item.id == 1);
alert(user.name); // Вася
```

<p>У метода <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex">arr.findIndex</a> такой же синтаксис, но он возвращает индекс, на котором был найден элемент, а не сам элемент. Значение <code>-1</code> возвращается, если ничего не найдено.</p>

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex">arr.findLastIndex</a> похож на  <code>findIndex</code>, но ищет справа налево, наподобие <code>lastIndexOf</code>.</p>

```js
let users = [
  {id: 1, name: "Вася"},
  {id: 2, name: "Петя"},
  {id: 3, name: "Маша"},
  {id: 4, name: "Вася"}
];

// Найти индекс первого Васи
alert(users.findIndex(user => user.name == 'Вася')); // 0

// Найти индекс последнего Васи
alert(users.findLastIndex(user => user.name == 'Вася')); // 3
```


### filter

<p>Метод <code>find</code> ищет один (первый) элемент, который заставит функцию вернуть <code>true</code>.</p>

<p>Если найденных элементов может быть много, можно использовать <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">arr.filter(fn)</a>.</p>

<p>Синтаксис схож с <code>find</code>, но <code>filter</code> возвращает массив из всех подходящих элементов:</p>

```js
let results = arr.filter(function(item, index, array) {
  // если `true` -- элемент добавляется к results и перебор продолжается
  // возвращается пустой массив в случае, если ничего не найдено
});
```

```js
let users = [
  {id: 1, name: "Вася"},
  {id: 2, name: "Петя"},
  {id: 3, name: "Маша"}
];

// возвращает массив, состоящий из двух первых пользователей
let someUsers = users.filter(item => item.id < 3);
alert(someUsers.length); // 2
```

## Преобразование массива

### map

Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/map">arr.map</a> является одним из наиболее полезных и часто используемых.
Он вызывает функцию для каждого элемента массива и возвращает массив результатов выполнения этой функции.

```js
let result = arr.map(function(item, index, array) {
  // возвращается новое значение вместо элемента
});
```

Например, здесь мы преобразуем каждый элемент в его длину:

```js
let lengths = ["Бильбо", "Гэндальф", "Назгул"].map(item => item.length);
alert(lengths); // 6,8,6
```

### sort(fn)

<p>Вызов <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">arr.sort()</a> сортирует массив <em>на месте</em>, меняя в нём порядок элементов.</p>

<p>Он также возвращает отсортированный массив, но обычно возвращаемое значение игнорируется, так как изменяется сам <code>arr</code>.</p>

```js
let arr = [ 1, 2, 15 ];

// метод сортирует содержимое arr
arr.sort();
alert( arr );  // 1, 15, 2
```

**По умолчанию элементы сортируются как строки.**

<p>Чтобы использовать наш собственный порядок сортировки, нам нужно предоставить функцию в качестве аргумента <code>arr.sort()</code>.</p>

Функция должна для пары значений возвращать:

```js
function compare(a, b) {
  if (a > b) return 1; // если первое значение больше второго
  if (a == b) return 0; // если равны
  if (a < b) return -1; // если первое значение меньше второго
}
```

```js
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15
```

<p>Сделаем отступление и подумаем, что происходит. <code>arr</code> может быть массивом чего угодно, верно? Он может содержать числа, строки, объекты или что-то ещё. У нас есть набор <em>каких-то элементов</em>. Чтобы отсортировать его, нам нужна <em>упорядочивающая функция</em>, которая знает, как сравнивать его элементы. По умолчанию элементы сортируются как строки.</p>

<p>Метод <code>arr.sort(fn)</code> реализует общий алгоритм сортировки. Нам не нужно заботиться о том, как он работает внутри (в большинстве случаев это оптимизированная <a href="https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%82%D1%80%D0%B0%D1%8F_%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0">быстрая сортировка</a> или <a href="https://ru.wikipedia.org/wiki/Timsort">Timsort</a>). Она проходится по массиву, сравнивает его элементы с помощью предоставленной функции и переупорядочивает их. Всё, что нам нужно, – предоставить <code>fn</code>, которая делает сравнение.</p>

### reverse

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse">arr.reverse</a> меняет порядок элементов в <code>arr</code> на обратный.</p>

```js
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

<p>Он также возвращает массив <code>arr</code> с изменённым порядком элементов.</p>

### split и join

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/split">str.split(delim)</a> разбивает строку на массив по заданному разделителю <code>delim</code>.</p>

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/join">arr.join()</a> делает в точности противоположное <code>split</code>. Он создаёт строку из элементов <code>arr</code></p>

### reduce/reduceRight

<p>Когда нам нужно перебрать массив – мы можем использовать <code>forEach</code>, <code>for</code> или <code>for..of</code>.</p>

<p>Когда нам нужно перебрать массив и вернуть данные для каждого элемента – мы можем использовать <code>map</code>.</p>

<p>Методы <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce">arr.reduce</a> и <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight">arr.reduceRight</a> похожи на методы выше, но они немного сложнее. Они используются для вычисления единого значения на основе всего массива.</p>

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

Функция применяется по очереди ко всем элементам массива и «переносит» свой результат на следующий вызов.

Аргументы:

<ul>
<li><code>accumulator</code> – результат предыдущего вызова этой функции, равен <code>initial</code> при первом вызове (если передан <code>initial</code>),</li>
<li><code>item</code> – очередной элемент массива,</li>
<li><code>index</code> – его позиция,</li>
<li><code>array</code> – сам массив.</li>
</ul>

При вызове функции результат её предыдущего вызова передаётся на следующий вызов в качестве первого аргумента.

<p>Так, первый аргумент является по сути аккумулятором, который хранит объединённый результат всех предыдущих вызовов функции. По окончании он становится результатом <code>reduce</code>.</p>

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);
alert(result); // 15
```

<img src="/assets/images/theory/js/array2.png" alt=""/>

При отсутствии <code>initial</code> в качестве первого значения берётся первый элемент массива, а перебор стартует со второго.

<p>Метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight">arr.reduceRight</a> работает аналогично, но проходит по массиву справа налево.</p>

## Array.isArray

Массивы не образуют отдельный тип данных. Они основаны на объектах.

Поэтому <code>typeof</code> не может отличить простой объект от массива:

```js
alert(typeof {}); // object
alert(typeof []); // тоже object
```

<p>…Но массивы используются настолько часто, что для этого придумали специальный метод: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray">Array.isArray(value)</a>. Он возвращает <code>true</code>, если <code>value</code> массив, и <code>false</code>, если нет.</p>

```js
alert(Array.isArray({})); // false
alert(Array.isArray([])); // true
```

## Array.from

Объекты, которые можно использовать в цикле for..of, называются итерируемыми.

Объекты, имеющие индексированные свойства и length, называются псевдомассивами. Они также могут иметь другие свойства и методы, но у них нет встроенных методов массивов.

<p>Есть универсальный метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/from">Array.from</a>, который принимает итерируемый объект или псевдомассив и делает из него «настоящий» <code>Array</code>. После этого мы уже можем использовать методы массивов.</p>

<p><code>Array.from</code> в строке <code>(*)</code> принимает объект, проверяет, является ли он итерируемым объектом или псевдомассивом, затем создаёт новый массив и копирует туда все элементы.</p>


## Итого

<ul>
<li>
<p>Для добавления/удаления элементов:</p>
<ul>
<li><code>push(...items)</code> – добавляет элементы в конец,</li>
<li><code>pop()</code> – извлекает элемент с конца,</li>
<li><code>shift()</code> – извлекает элемент с начала,</li>
<li><code>unshift(...items)</code> – добавляет элементы в начало.</li>
<li><code>splice(pos, deleteCount, ...items)</code> – начиная с индекса <code>pos</code> удаляет <code>deleteCount</code> элементов и вставляет <code>items</code>.</li>
<li><code>slice(start, end)</code> – создаёт новый массив, копируя в него элементы с индекса <code>start</code> до <code>end</code> (не включая <code>end</code>).</li>
<li><code>concat(...items)</code> – возвращает новый массив: копирует все члены текущего массива и добавляет к нему <code>items</code>. Если какой-то из <code>items</code> является массивом, тогда берутся его элементы.</li>
</ul>
</li>
<li>
<p>Для поиска среди элементов:</p>
<ul>
<li><code>indexOf/lastIndexOf(item, pos)</code> – ищет <code>item</code>, начиная с позиции <code>pos</code>, и возвращает его индекс или <code>-1</code>, если ничего не найдено.</li>
<li><code>includes(value)</code> – возвращает <code>true</code>, если в массиве имеется элемент <code>value</code>, в противном случае <code>false</code>.</li>
<li><code>find/filter(func)</code> – фильтрует элементы через функцию и отдаёт первое/все значения, при прохождении которых через функцию возвращается <code>true</code>.</li>
<li><code>findIndex</code> похож на <code>find</code>, но возвращает индекс вместо значения.</li>
</ul>
</li>
<li>
<p>Для перебора элементов:</p>
<ul>
<li><code>forEach(func)</code> – вызывает <code>func</code> для каждого элемента. Ничего не возвращает.</li>
</ul>
</li>
<li>
<p>Для преобразования массива:</p>
<ul>
<li><code>map(func)</code> – создаёт новый массив из результатов вызова <code>func</code> для каждого элемента.</li>
<li><code>sort(func)</code> – сортирует массив «на месте», а потом возвращает его.</li>
<li><code>reverse()</code> – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.</li>
<li><code>split/join</code> – преобразует строку в массив и обратно.</li>
<li><code>reduce/reduceRight(func, initial)</code> – вычисляет одно значение на основе всего массива, вызывая <code>func</code> для каждого элемента и передавая промежуточный результат между вызовами.</li>
</ul>
</li>
<li>
<p>Дополнительно:</p>
<ul>
<li><code>Array.isArray(arr)</code> проверяет, является ли <code>arr</code> массивом.</li>
</ul>
</li>
</ul>

<p>Методы <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>sort</code>, <code>reverse</code> и <code>splice</code> изменяют исходный массив.</p>

Эти методы – самые используемые, их достаточно в 99% случаев. Но существуют и другие:

<ul>
<li>
<p><a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/some">arr.some(fn)</a>/<a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/every">arr.every(fn)</a> проверяет массив.</p>
<p>Функция <code>fn</code> вызывается для каждого элемента массива аналогично <code>map</code>. Если какие-либо/все результаты вызовов являются <code>true</code>, то метод возвращает <code>true</code>, иначе <code>false</code>.</p>
<p>Эти методы ведут себя примерно так же, как операторы <code>||</code> и <code>&amp;&amp;</code>: если <code>fn</code> возвращает истинное значение, <code>arr.some()</code> немедленно возвращает <code>true</code> и останавливает перебор остальных элементов; если <code>fn</code> возвращает ложное значение, <code>arr.every()</code> немедленно возвращает <code>false</code> и также прекращает перебор остальных элементов.</p></li>
<p>Мы можем использовать <code>every</code> для сравнения массивов:</p>

```js
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}
alert( arraysEqual([1, 2], [1, 2])); // true
```

<li>
<p><a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/fill">arr.fill(value, start, end)</a> – заполняет массив повторяющимися <code>value</code>, начиная с индекса <code>start</code> до <code>end</code>.</p>
</li>
<li>
<p><a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin">arr.copyWithin(target, start, end)</a> – копирует свои элементы, начиная с позиции <code>start</code> и заканчивая <code>end</code>, в <em>себя</em>, на позицию <code>target</code> (перезаписывая существующие).</p>
</li>
<li>
<p><a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/flat">arr.flat(depth)</a>/<a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap">arr.flatMap(fn)</a> создаёт новый плоский массив из многомерного массива.</p>
</li>
</ul>

<p>Полный список есть в <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array">справочнике MDN</a>.</p>