**CancrinBot**
===

Telegram бот позволяющий быстро получить актуальные курсы валют от Центрального банка России.

![cancrin](https://github.com/LokiX7/cancrinBot/assets/73707133/ab32c9c3-afee-4c73-abd5-d08c0e380146)

Особенности
---
  + Простота использования
  + Встроенный парсер данных которые предоставляет сайт [cbr-xml-daily.ru](https://www.cbr-xml-daily.ru/)
  + Парсер можно с лёгкостью заменить на другой
  + Бот сам обновляет данные по будням в 1 час ночи по МСК
  

Установка
---

1. Клонируйте репозиторий
    ```
    $ git clone https://github.com/LokiX7/cancrinBot.git
    ```
2. Перейдите в папку проекта
    ```
    $ cd cancrinBot
    ```
3. Установите зависимости
    ```
      $ npm install
    ```
4. Откройте файл .env.example и установите значения переменных

    `BOT_TOKEN='ваш токен'` - Токен вашего бота который вы получили от BotFather.
    
    `BOT_NAME='имя вашего бота'` - Имя вашего бота
    
    `DB_NAME='имя базы данных'` - Имя вашей sqlite БД

    Пример:

    ```
    BOT_TOKEN='0000000000:XXXX0xxx0XXx00xXXx0xxx0XXXxxx00Xxxxxx'
    BOT_NAME='CancrinBot'
    DB_NAME='exchange.db'
    ```
5. Сохраните файл с переменными как новый файл с именем .env 

6. Запустите бота
    ```
    npm run start
    ```
Команды бота
---

`/start` - Бот приветствует пользователя и выводит кнопку, показывающую меню доступных валют. (Как при вызове `/curency`)

`/curency` - Меню кнопок доступных валют. У каждой кнопки имя это код предоставляемой валюты. Например, AUD, EUR или USD. 

Каждая кнопка выводит упрощённую информацию об валюте, например: 
  > Австралийский доллар - 61.16 руб

`/list` - Список всех доступных валют - коды валют и их наименования. Например:
  >1. AUD - Австралийский доллар
  >2. AZN - Азербайджанский манат
  >3. GBP - Фунт стерлингов Соединенного королевства
  >4. ...

`/help` - Выводит руководство об использовании функционала бота.

`/help [код валюты]` - Выводит полную информацию о валюте. Например: `/help aud` выведет:
  >Австралийский доллар
   >
   >\- Буквенный код: AUD
   >
   >\- Цифровой код: 036
   >
   >\- Номинал: 1
   >
   >\- Обменный курс: 61.1622

`[код валюты]` - Выводит упрощённую информацию о валюте. Например `aud` выведет:
> Австралийский доллар - 61.16 руб

Замена парсера
---

Если вы хотите заменить модуль парсера на другой, ваш service класс должен имплементировать интерфейс ***ParserServiceI***, а именно ваш класс должен реализовать метод ***getData()*** который должен возвращать тип ***ExchangeDataI***. Все необходимые интерфейсы находятся по пути:
[./src/common/interfaces/](./src/common/interfaces/)

Изменить время обновления данных
---

Если вы хотите чтобы бот обновлял данные в другое время, то установить время и дни вы можете в  файле [./src/cbr-exchange/cbr-exchange.service.ts](./src/cbr-exchange/cbr-exchange.service.ts) в декораторе ***@Cron*** метода ***initExchangeData()*** используя для это специальный синтаксис Cron или enum ***CronExpression***.

Связь со мной
--- 

**Telegram**: @lokixio
