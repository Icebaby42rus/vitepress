## Доступ к символам

<p>Получить символ, который занимает позицию <code>pos</code>, можно с помощью квадратных скобок: <code>[pos]</code>. Также можно использовать метод <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at">str.at(pos)</a>. Первый символ занимает нулевую позицию:</p>
Преимущество метода <code>.at(pos)</code> заключается в том, что он допускает отрицательную позицию. Если pos – отрицательное число, то отсчет ведется от конца строки.

<p>Также можно перебрать строку посимвольно, используя <code>for..of</code></p>

## Поиск подстроки

### str.indexOf

<p>Первый метод — <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf">str.indexOf(substr, pos)</a>.</p>

<p>Он ищет подстроку <code>substr</code> в строке <code>str</code>, начиная с позиции <code>pos</code>, и возвращает позицию, на которой располагается совпадение, либо <code>-1</code> при отсутствии совпадений.</p>
Необязательный второй аргумент позволяет начать поиск с определённой позиции.

Чтобы найти все вхождения подстроки, нужно запустить <code>indexOf</code> в цикле. Каждый раз, получив очередную позицию, начинаем новый поиск со следующей:
<img src="/assets/images/theory/js/string1.png" alt=""/>

<img src="/assets/images/theory/js/string2.png" alt=""/>

### includes, startsWith, endsWith

<p>Более современный метод <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/includes">str.includes(substr, pos)</a> возвращает <code>true</code>, если в строке <code>str</code> есть подстрока <code>substr</code>, либо <code>false</code>, если нет.</p>

Это — правильный выбор, если нам необходимо проверить, есть ли совпадение, но позиция не нужна:

```js
alert( "Widget with id".includes("Widget") ); // true
alert( "Hello".includes("Bye") ); // false
```

<p>Методы <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith">str.startsWith</a> и <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith">str.endsWith</a> проверяют, соответственно, начинается ли и заканчивается ли строка определённой строкой:</p>

```js
alert( "Widget".startsWith("Wid") ); // true, "Wid" — начало "Widget"
alert( "Widget".endsWith("get") ); // true, "get" — окончание "Widget"
```

### Получение подстроки

<p>В JavaScript есть 3 метода для получения подстроки: <code>substring</code>, <code>substr</code> и <code>slice</code>.</p>

<code>str.slice(start [, end])</code> - возвращает часть строки от <code>start</code> до (не включая) <code>end</code>.

```js
let str = "stringify";
// 'strin', символы от 0 до 5 (не включая 5)
alert( str.slice(0, 5) );
// 's', от 0 до 1, не включая 1, т. е. только один символ на позиции 0
alert( str.slice(0, 1) );
```

<p>Если аргумент <code>end</code> отсутствует, <code>slice</code> возвращает символы до конца строки</p>

<p>Также для <code>start/end</code> можно задавать отрицательные значения. Это означает, что позиция определена как заданное количество символов <em>с конца строки</em>:</p>

```js
let str = "stringify";
// начинаем с позиции 4 справа, а заканчиваем на позиции 1 справа
alert( str.slice(-4, -1) ); // gif
```

<code>str.substring(start [, end])</code>- возвращает часть строки между <code>start</code> и <code>end</code> (не включая) <code>end</code>.

Это — почти то же, что и <code>slice</code>, но можно задавать <code>start</code> больше end.
Если <code>start</code> больше <code>end</code>, то метод <code>substring</code> сработает так, как если бы аргументы были поменяны местами.

```js
let str = "stringify";
// для substring эти два примера — одинаковы
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"
// …но не для slice:
alert( str.slice(2, 6) ); // "ring" (то же самое)
alert( str.slice(6, 2) ); // "" (пустая строка)
```

<p>Отрицательные значения <code>substring</code>, в отличие от <code>slice</code>, не поддерживает, они интерпретируются как <code>0</code>.</p>

<code>str.substr(start [, length])</code> - возвращает часть строки от <code>start</code> длины <code>length</code>.

В противоположность предыдущим методам, этот позволяет указать длину вместо конечной позиции:

```js
let str = "stringify";
// ring, получаем 4 символа, начиная с позиции 2
alert( str.substr(2, 4) );
```

Значение первого аргумента может быть отрицательным, тогда позиция определяется с конца:

```js
let str = "stringify";
// gi, получаем 2 символа, начиная с позиции 4 с конца строки
alert( str.substr(-4, 2) );
```

<table>
<thead>
<tr>
<th>метод</th>
<th>выбирает…</th>
<th>отрицательные значения</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>slice(start, end)</code></td>
<td>от <code>start</code> до <code>end</code> (не включая <code>end</code>)</td>
<td>можно передавать отрицательные значения</td>
</tr>
<tr>
<td><code>substring(start, end)</code></td>
<td>между <code>start</code> и <code>end</code> (не включая <code>end</code>)</td>
<td>отрицательные значения равнозначны <code>0</code></td>
</tr>
<tr>
<td><code>substr(start, length)</code></td>
<td><code>length</code> символов, начиная от <code>start</code></td>
<td>значение <code>start</code> может быть отрицательным</td>
</tr>
</tbody>
</table>