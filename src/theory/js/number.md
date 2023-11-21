## Числа

Чтобы писать числа с большим количеством нулей:

<ul>
<li>Используйте краткую форму записи чисел – <code>"e"</code>, с указанным количеством нулей. Например: <code>123e6</code> это <code>123</code> с 6-ю нулями <code>123000000</code>.</li>
<li>Отрицательное число после <code>"e"</code> приводит к делению числа на 1 с указанным количеством нулей. Например: <code>123e-6</code> это <code>0.000123</code> (<code>123</code> миллионных).</li>
</ul>

Для других систем счисления:

<ul>
<li>Можно записывать числа сразу в шестнадцатеричной (<code>0x</code>), восьмеричной (<code>0o</code>) и бинарной (<code>0b</code>) системах счисления</li>
<li><code>parseInt(str, base)</code> преобразует строку в целое число в соответствии с указанной системой счисления: <code>2 ≤ base ≤ 36</code>.</li>
<li><code>num.toString(base)</code> представляет число в строковом виде в указанной системе счисления <code>base</code>.</li>
</ul>

<p>Для проверки на <code>NaN</code> и <code>Infinity</code>:</p>

<ul>
<li><code>isNaN(value)</code> преобразует аргумент в число и проверяет, является ли оно <code>NaN</code></li>
<li><code>Number.isNaN(value)</code> проверяет, является ли аргумент числом, и если да, то проверяет, является ли оно <code>NaN</code></li>
<li><code>isFinite(value)</code> преобразует аргумент в число и проверяет, что оно не является <code>NaN/Infinity/-Infinity</code></li>
<li><code>Number.isFinite(value)</code> проверяет, является ли аргумент числом, и если да, то проверяет, что оно не является <code>NaN/Infinity/-Infinity</code></li>
</ul>

<p>Для преобразования значений типа <code>12pt</code> и <code>100px</code> в число:</p>

<ul>
<li>Используйте <code>parseInt/parseFloat</code> для «мягкого» преобразования строки в число, данные функции по порядку считывают число из строки до тех пор пока не возникнет ошибка.</li>
</ul>

Для дробей:

<ul>
<li>Используйте округления <code>Math.floor</code>, <code>Math.ceil</code>, <code>Math.trunc</code>, <code>Math.round</code> или <code>num.toFixed(precision)</code>.</li>
<li>Помните, что при работе с дробями происходит потеря точности.</li>
</ul>