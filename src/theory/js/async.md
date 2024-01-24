## Callback

#### Введение

Многие действия в JavaScript *асинхронные*.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}
```
Смысл такой: вторым аргументом передаётся функция (обычно анонимная), которая выполняется по завершении действия.

<p>Такое написание называют асинхронным программированием с использованием колбэков. В функции, которые выполняют какие-либо асинхронные операции, передаётся аргумент <code>callback</code> — функция, которая будет вызвана по завершению асинхронного действия.</p>

#### Перехват ошибок

<p>Улучшенная версия <code>loadScript</code>, которая умеет отслеживать ошибки загрузки:</p>

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));

  document.head.append(script);
}
```

<p>Мы вызываем <code>callback(null, script)</code> в случае успешной загрузки и <code>callback(error)</code>, если загрузить скрипт не удалось.</p>

Живой пример:

```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // обрабатываем ошибку
  } else {
    // скрипт успешно загружен
  }
});
```

<p>Опять же, подход, который мы использовали в <code>loadScript</code>, также распространён и называется «колбэк с первым аргументом-ошибкой» («error-first callback»).</p>

Правила таковы:

<ol>
<li>Первый аргумент функции <code>callback</code> зарезервирован для ошибки. В этом случае вызов выглядит вот так: <code>callback(err)</code>.</li>
<li>Второй и последующие аргументы — для результатов выполнения. В этом случае вызов выглядит вот так: <code>callback(null, result1, result2…)</code>.</li>
</ol>

<p>Одна и та же функция <code>callback</code> используется и для информирования об ошибке, и для передачи результатов.</p>

## Промисы

<code>Promise</code> (по англ. <code>promise</code>, будем называть такой объект «промис») – это специальный объект в JavaScript, который связывает «создающий» и «потребляющий» коды вместе.

<p>Синтаксис создания <code>Promise</code>:</p>

```js
let promise = new Promise(function(resolve, reject) {
  // функция-исполнитель (executor)
});
```

<p>Функция, переданная в конструкцию <code>new Promise</code>, называется <em>исполнитель</em> (executor). Когда <code>Promise</code> создаётся, она запускается автоматически. Она должна содержать «создающий» код, который когда-нибудь создаст результат.</p>

<p>Её аргументы <code>resolve</code> и <code>reject</code> – это колбэки, которые предоставляет сам JavaScript. Наш код – только внутри исполнителя.</p>

Когда он получает результат, сейчас или позже – не важно, он должен вызвать один из этих колбэков:

<ul>
<li><code>resolve(value)</code> — если работа завершилась успешно, с результатом <code>value</code>.</li>
<li><code>reject(error)</code> — если произошла ошибка, <code>error</code> – объект ошибки.</li>
</ul>

<p>Итак, исполнитель запускается автоматически, он должен выполнить работу, а затем вызвать <code>resolve</code> или <code>reject</code>.</p>

<p>У объекта <code>promise</code>, возвращаемого конструктором <code>new Promise</code>, есть внутренние свойства:</p>

<ul>
<li><code>state</code> («состояние») — вначале <code>"pending"</code> («ожидание»), потом меняется на  <code>"fulfilled"</code> («выполнено успешно») при вызове <code>resolve</code> или на <code>"rejected"</code> («выполнено с ошибкой») при вызове <code>reject</code>.</li>
<li><code>result</code> («результат») — вначале <code>undefined</code>, далее изменяется на <code>value</code> при вызове <code>resolve(value)</code> или на <code>error</code> при вызове <code>reject(error)</code>.</li>
</ul>

<p>Так что исполнитель по итогу переводит <code>promise</code> в одно из двух состояний:</p>

<img src="/assets/images/theory/js/async.png" alt="" style="width: 500px" />

### Потребители: then, catch

<p>Объект <code>Promise</code> служит связующим звеном между исполнителем и функциями-потребителями, которые получат либо результат, либо ошибку. Функции-потребители могут быть зарегистрированы (подписаны) с помощью методов <code>.then</code> и <code>.catch</code>.</p>

#### then

```js
promise.then(
  function(result) { /* обработает успешное выполнение */ },
  function(error) { /* обработает ошибку */ }
);
```

<p>Первый аргумент метода <code>.then</code> – функция, которая выполняется, когда промис переходит в состояние «выполнен успешно», и получает результат.</p>

<p>Второй аргумент <code>.then</code>  – функция, которая выполняется, когда промис переходит в состояние «выполнен с ошибкой», и получает ошибку.</p>

#### catch

<p>Если мы хотели бы только обработать ошибку, то можно использовать <code>null</code> в качестве первого аргумента: <code>.then(null, errorHandlingFunction)</code>. Или можно воспользоваться методом <code>.catch(errorHandlingFunction)</code>, который сделает то же самое:</p>

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Ошибка!")), 1000);
});

// .catch(f) это то же самое, что promise.then(null, f)
promise.catch(alert); // выведет "Error: Ошибка!" спустя одну секунду
```

### Очистка: finally

<p>По аналогии с блоком <code>finally</code> из обычного <code>try {...} catch {...}</code>, у промисов также есть метод <code>finally</code>.</p>

<p>Идея <code>finally</code> состоит в том, чтобы настроить обработчик для выполнения очистки/доведения после завершения предыдущих операций.</p>
Например, остановка индикаторов загрузки, закрытие больше не нужных соединений и т.д.

Думайте об этом как о завершении вечеринки. Независимо от того, была ли вечеринка хорошей или плохой, сколько на ней было друзей, нам все равно нужно (или, по крайней мере, мы должны) сделать уборку после нее.

Код может выглядеть следующим образом:

```js
new Promise((resolve, reject) => {
  /* сделать что-то, что займёт время, и после вызвать resolve или может reject */
})
  // выполнится, когда промис завершится, независимо от того, успешно или нет
  .finally(() => остановить индикатор загрузки)
  // таким образом, индикатор загрузки всегда останавливается, прежде чем мы продолжим
  .then(result => показать результат, err => показать ошибку)
```

<p>Обратите внимание, что <code>finally(f)</code> – это не совсем псевдоним <code>then(f,f)</code>, как можно было подумать.</p>

Есть важные различия:

<ol>
<li>
<p>Обработчик, вызываемый из <code>finally</code>, не имеет аргументов. В <code>finally</code> мы не знаем, как был завершён промис. И это нормально, потому что обычно наша задача – выполнить «общие» завершающие процедуры.</p>
<p>Пожалуйста, взгляните на приведенный выше пример: как вы можете видеть, обработчик <code>finally</code> не имеет аргументов, а результат promise обрабатывается в следующем обработчике.</p>
</li>
<li>
<p>Обработчик <code>finally</code> «пропускает» результат или ошибку дальше, к последующим обработчикам.</p>
<p>Например, здесь результат проходит через <code>finally</code> к <code>then</code>:</p>

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => alert("Промис завершён")) // срабатывает первым
  .then(result => alert(result)); // <-- .then показывает "value"
```

<p>Как вы можете видеть, значение возвращаемое первым промисом, передается через <code>finally</code> к следующему <code>then</code>.</p>
<p>Это очень удобно, потому что <code>finally</code> не предназначен для обработки результата промиса. Как уже было сказано, это место для проведения общей очистки, независимо от того, каков был результат.</p>
<p>А здесь ошибка из промиса проходит через <code>finally</code> к <code>catch</code>:</p>

```js
new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => alert("Промис завершён")) // срабатывает первым
  .catch(err => alert(err));  // <-- .catch показывает ошибку
```

</li>
<li>
<p>Обработчик <code>finally</code> также не должен ничего возвращать. Если это так, то возвращаемое значение молча игнорируется.</p>
<p>Единственным исключением из этого правила является случай, когда обработчик <code>finally</code> выдает ошибку. Затем эта ошибка передается следующему обработчику вместо любого предыдущего результата.</p>
</li>
</ol>

<p>Теперь перепишем функцию <code>loadScript</code>, используя <code>Promise</code>.</p>


<p>Новой функции <code>loadScript</code> более не нужен аргумент <code>callback</code>. Вместо этого она будет создавать и возвращать объект <code>Promise</code>, который перейдет в состояние «успешно завершён», когда загрузка закончится. Внешний код может добавлять обработчики («подписчиков»), используя <code>.then</code>:</p>

```js
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  });
}
```

Применение:

```js
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} загружен!`),
  error => alert(`Ошибка: ${error.message}`)
);

promise.then(script => alert('Ещё один обработчик...'));
```

### Цепочка промисов

<p>Если обработчик в <code>.then</code> (или в <code>catch/finally</code>, без разницы) возвращает промис, последующие элементы цепочки ждут, пока этот промис выполнится. Когда это происходит, результат его выполнения (или ошибка) передаётся дальше.</p>

<img src="/assets/images/theory/js/async2.png" alt="" style="width: 500px" />

Например, мы можем послать запрос на GitHub, чтобы загрузить данные из профиля пользователя и показать его аватар:

```js
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Используем их:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
  // ..
```