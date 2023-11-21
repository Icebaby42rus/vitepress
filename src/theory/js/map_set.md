## Map

<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map">Map</a> – это коллекция ключ/значение, как и <code>Object</code>. Но основное отличие в том, что <code>Map</code> позволяет использовать ключи любого типа.</p>

Методы и свойства:

<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map"><code>new Map()</code></a> – создаёт коллекцию.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set"><code>map.set(key, value)</code></a> – записывает по ключу <code>key</code> значение <code>value</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get"><code>map.get(key)</code></a> – возвращает значение по ключу или <code>undefined</code>, если ключ <code>key</code> отсутствует.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has"><code>map.has(key)</code></a> – возвращает <code>true</code>, если ключ <code>key</code> присутствует в коллекции, иначе <code>false</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete"><code>map.delete(key)</code></a> – удаляет элемент (пару «ключ/значение») по ключу <code>key</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear"><code>map.clear()</code></a> – очищает коллекцию от всех элементов.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size"><code>map.size</code></a> – возвращает текущее количество элементов.</li>
</ul>

```js
let map = new Map();

map.set("1", "str1");    // строка в качестве ключа
map.set(1, "num1");      // цифра как ключ
map.set(true, "bool1");  // булево значение как ключ

// помните, обычный объект Object приводит ключи к строкам?
// Map сохраняет тип ключей, так что в этом случае сохранится 2 разных значения:
alert(map.get(1)); // "num1"
alert(map.get("1")); // "str1"

alert(map.size); // 3
```

Как мы видим, в отличие от объектов, ключи не были приведены к строкам. Можно использовать любые типы данных для ключей.

Map может использовать объекты в качестве ключей.

```js
let john = { name: "John" };

// давайте сохраним количество посещений для каждого пользователя
let visitsCountMap = new Map();

// объект john - это ключ для значения в объекте Map
visitsCountMap.set(john, 123);

alert(visitsCountMap.get(john)); // 123
```

<p>Использование объектов в качестве ключей – одна из наиболее заметных и важных функций <code>Map</code>. Это то что невозможно для <code>Object</code>. Строка в качестве ключа в <code>Object</code> – это нормально, но мы не можем использовать другой <code>Object</code> в качестве ключа в <code>Object</code>.</p>

## Перебор Map

<p>Для перебора коллекции <code>Map</code> есть 3 метода:</p>

<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys"><code>map.keys()</code></a> – возвращает итерируемый объект по ключам,</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values"><code>map.values()</code></a> – возвращает итерируемый объект по значениям,</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries"><code>map.entries()</code></a> – возвращает итерируемый объект по парам вида <code>[ключ, значение]</code>, этот вариант используется по умолчанию в <code>for..of</code>.</li>
</ul>

```js
let recipeMap = new Map([
  ["огурец", 500],
  ["помидор", 350],
  ["лук",    50]
]);

// перебор по ключам (овощи)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // огурец, помидор, лук
}

// перебор по значениям (числа)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// перебор по элементам в формате [ключ, значение]
for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
  alert(entry); // огурец,500 (и так далее)
}
```

<p>В отличие от обычных объектов <code>Object</code>, в <code>Map</code> перебор происходит в том же  порядке, в каком происходило добавление элементов.</p>

<p>Кроме этого, <code>Map</code> имеет встроенный метод <code>forEach</code>, схожий со встроенным методом массивов <code>Array</code>:</p>

```js
// выполняем функцию для каждой пары (ключ, значение)
recipeMap.forEach((value, key, map) => {
  alert(`${key}: ${value}`); // огурец: 500 и так далее
});
```

## Object.entries: Map из Object

<p>При создании <code>Map</code> мы можем указать массив (или другой итерируемый объект) с парами ключ-значение для инициализации, как здесь:</p>

```js
// массив пар [ключ, значение]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

<p>Если у нас уже есть обычный объект, и мы хотели бы создать <code>Map</code> из него, то поможет встроенный метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries">Object.entries(obj)</a>, который получает объект и возвращает массив пар ключ-значение для него, как раз в этом формате.</p>

<p>Так что мы можем создать <code>Map</code> из обычного объекта следующим образом:</p>

```js
let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John
```

<p>Здесь <code>Object.entries</code> возвращает массив пар ключ-значение: <code>[ ["name","John"], ["age", 30] ]</code>. Это именно то, что нужно для создания <code>Map</code>.</p>

## Object.fromEntries: Object из Map.

<p>Метод <code>Object.fromEntries</code>, который делает противоположное: получив массив пар вида <code>[ключ, значение]</code>, он создаёт из них объект:</p>

```js
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

<p>Мы можем использовать <code>Object.fromEntries</code>, чтобы получить обычный объект из <code>Map</code>.</p>

<p>К примеру, у нас данные в <code>Map</code>, но их нужно передать в сторонний код, который ожидает обычный объект.</p>

```js
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // создаём обычный объект (*)
// или можно записать еще короче
let obj = Object.fromEntries(map); // убрать .entries()

// готово!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

<p>Вызов <code>map.entries()</code> возвращает итерируемый объект пар ключ/значение, как раз в нужном формате для <code>Object.fromEntries</code>.</p>

<p>Это то же самое, так как <code>Object.fromEntries</code> ожидает перебираемый объект в качестве аргумента, не обязательно массив. А перебор <code>map</code> как раз возвращает пары ключ/значение, так же, как и <code>map.entries()</code>. Так что в итоге у нас будет обычный объект с теми же ключами/значениями, что и в <code>map</code>.</p>

## Set

<p>Объект <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set"><code>Set</code></a> – это особый вид коллекции: «множество» значений (без ключей), где каждое значение может появляться только один раз.</p>

Его основные методы это:

<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set"><code>new Set(iterable)</code></a> – создаёт <code>Set</code>, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый <code>Set</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add"><code>set.add(value)</code></a> – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект <code>set</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete"><code>set.delete(value)</code></a> – удаляет значение, возвращает <code>true</code>, если <code>value</code> было в множестве на момент вызова, иначе <code>false</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has"><code>set.has(value)</code></a> – возвращает <code>true</code>, если значение присутствует в множестве, иначе <code>false</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear"><code>set.clear()</code></a> – удаляет все имеющиеся значения.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size"><code>set.size</code></a> – возвращает количество элементов в множестве.</li>
</ul>

<p>Основная «изюминка» – это то, что при повторных вызовах <code>set.add()</code> с одним и тем же значением ничего не происходит, за счёт этого как раз и получается, что каждое значение появляется один раз.</p>

Например, мы ожидаем посетителей, и нам необходимо составить их список. Но повторные визиты не должны приводить к дубликатам. Каждый посетитель должен появиться в списке только один раз.

<p>Множество <code>Set</code> – как раз то, что нужно для этого:</p>

```js
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// считаем гостей, некоторые приходят несколько раз
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set хранит только 3 уникальных значения
alert(set.size); // 3

for (let user of set) {
  alert(user.name); // John (потом Pete и Mary)
}
```

<p>Альтернативой множеству <code>Set</code> может выступать массив для хранения гостей и дополнительный код для проверки уже имеющегося элемента с помощью <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/find">arr.find</a>. Но в этом случае будет хуже производительность, потому что <code>arr.find</code> проходит весь массив для проверки наличия элемента. Множество <code>Set</code> лучше оптимизировано для добавлений, оно автоматически проверяет на уникальность.</p>

## Перебор объекта Set

<p>Мы можем перебрать содержимое объекта set как с помощью метода <code>for..of</code>, так и используя <code>forEach</code>:</p>

```js
let set = new Set(["апельсин", "яблоко", "банан"]);

for (let value of set) alert(value);

// то же самое с forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

<p>Заметим забавную вещь. Функция в <code>forEach</code> у <code>Set</code> имеет 3 аргумента: значение <code>value</code>, потом <em>снова то же самое значение</em> <code>valueAgain</code>, и только потом целевой объект. Это действительно так, значение появляется в списке аргументов дважды.</p>

<p>Это сделано для совместимости с объектом <code>Map</code>, в котором колбэк <code>forEach</code> имеет 3 аргумента. Выглядит немного странно, но в некоторых случаях может помочь легко заменить <code>Map</code> на <code>Set</code> и наоборот.</p>

<p><code>Set</code> имеет те же встроенные методы, что и <code>Map</code>:</p>

<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys"><code>set.keys()</code></a> – возвращает перебираемый объект для значений,</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values"><code>set.values()</code></a> – то же самое, что и <code>set.keys()</code>, присутствует для обратной совместимости с <code>Map</code>,</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries"><code>set.entries()</code></a> – возвращает перебираемый объект для пар вида <code>[значение, значение]</code>, присутствует для обратной совместимости с <code>Map</code>.</li>
</ul>

## WeakMap и WeakSet

<p><code>WeakMap</code> – это <code>Map</code>-подобная коллекция, позволяющая использовать в качестве ключей только объекты, и автоматически удаляющая их вместе с соответствующими значениями, как только они становятся недостижимыми иными путями.</p>

<p><code>WeakSet</code> – это <code>Set</code>-подобная коллекция, которая хранит только объекты и удаляет их, как только они становятся недостижимыми иными путями.</p>

Обе этих структуры данных не поддерживают методы и свойства, работающие со всем содержимым сразу или возвращающие информацию о размере коллекции. Возможны только операции на отдельном элементе коллекции.

<p><code>WeakMap</code> и <code>WeakSet</code> используются как вспомогательные структуры данных в дополнение к «основному» месту хранения объекта. Если объект удаляется из основного хранилища и нигде не используется, кроме как в качестве ключа в <code>WeakMap</code> или в <code>WeakSet</code>, то он будет удалён автоматически.</p>

## Итого

<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"><code>Map</code></a> – коллекция пар ключ-значение.</p>

Методы и свойства:

<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map"><code>new Map([iterable])</code></a> – создаёт коллекцию, можно указать перебираемый объект (обычно массив) из пар <code>[ключ,значение]</code> для инициализации.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set"><code>map.set(key, value)</code></a> – записывает по ключу <code>key</code> значение <code>value</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get"><code>map.get(key)</code></a> – возвращает значение по ключу или <code>undefined</code>, если ключ <code>key</code> отсутствует.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has"><code>map.has(key)</code></a> – возвращает <code>true</code>, если ключ <code>key</code> присутствует в коллекции, иначе <code>false</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete"><code>map.delete(key)</code></a> – удаляет элемент по ключу <code>key</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear"><code>map.clear()</code></a> – очищает коллекцию от всех элементов.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size"><code>map.size</code></a> – возвращает текущее количество элементов.</li>
</ul>

<p>Отличия от обычного объекта <code>Object</code>:</p>

<ul>
<li>Что угодно может быть ключом, в том числе и объекты.</li>
<li>Есть дополнительные методы, свойство <code>size</code>.</li>
</ul>

<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set"><code>Set</code></a> – коллекция уникальных значений, так называемое «множество».</p>

Методы и свойства:

<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set"><code>new Set(iterable)</code></a> – создаёт <code>Set</code>, можно указать перебираемый объект со значениями для инициализации.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add"><code>set.add(value)</code></a> – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект <code>set</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete"><code>set.delete(value)</code></a> – удаляет значение, возвращает <code>true</code> если <code>value</code> было в множестве на момент вызова, иначе <code>false</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has"><code>set.has(value)</code></a> – возвращает <code>true</code>, если значение присутствует в множестве, иначе <code>false</code>.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear"><code>set.clear()</code></a> – удаляет все имеющиеся значения.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size"><code>set.size</code></a> – возвращает количество элементов в множестве.</li>
</ul>

<p>Перебор <code>Map</code> и <code>Set</code> всегда осуществляется в порядке добавления элементов, так что нельзя сказать, что это – неупорядоченные коллекции, но поменять порядок элементов или получить элемент напрямую по его номеру нельзя.</p>