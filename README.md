# Яндекс переговорки
## Тестовое задание для поступления в школу разработки интерфейсов Yandex 2018 #3. Разработка SPA (Яндекс-переговорки).

> Приветствую ревьювера третьего задания. Спасибо за потраченное время на проверку данного кода. Фидбек можете присылать на ar.vaganov@gmail.com :). Третье задание самое интересное и трудоемкое. Я люблю JS и алгоритмические задачки. Здесь этого оказалось достаточно и, небольшой перфекционизм дал о себе знать, выполнение этого задания затянулось до четырех дней. И дело даже не в свапе комнат, хотя и там еще есть что доработать. Есть еще таймлайн - перевод пикселов в Date() и обратно, всевозможные варианты в комнате редактирования. Подсветка комнат и разделение этажей, пагинация по дням! Обо всех сложностях и мыслях подробнее ниже.

Статика доступна на [https://akimy.github.io](https://akimy.github.io)

### Инициализация

1. Скачайте себе репозиторий
```
git clone https://github.com/akimy/y-shri-2018-entrance-task.git
```
2. Установите все зависимости.
```
npm install
```
3. Запустите сборку бандла dev(для отладки) 
```
npm run dev
```
или
3.2. Запустите сборку бандла в продакшен (меньший размер + свободная консоль),
```
npm run build
```

5. Запуск NodeJS (для отдачи корневого html)
```
npm run start
```
6. Моки базы данных (для отдачи корневого html)
```
npm run reset-db
```

Если вы прошли все шаги, приложение должно быть доступно на http://localhost:3000/  


### Ниже я постараюсь описать все свои мысли и последовательные действия связаные с реализацией SPA.
Опционально - я стараюсь делать приложения так, чтобы ими могли пользоваться слепые люди, их около 4%, но они заслуживают того, чтобы навигация по приложению с помощью клавиатуры была возможна.
Подробнее о архитектуре: я использую реакт для построения SPA приложений. Существуют несколько паттернов и хороших практик, которые  применяются в реакт сообществе в частности, разделение компонентов на "components" и "containers". Первые представляют собой, в большинстве случаев, чистые функции и не хранят в себе состояние. Они отвечают только за отображение данных. Вторые - контейнеры. Они отвечают за получение данных, обработку данных и отправку обработанных данных компонентам-представлениям. Именно они будут темой этого задания. Таким образом директория /client/components - это именно то - что Вас интересует. Остальному мы тоже уделим немного внимания. Тестов написанно не было, во первых - я плох в написании тестов. Во вторых на это просто недостаточно времени, я еще не завершил второе задание до конца. Однако, тут была использованна зависимость prop-types для валидации всех типов входящих данных (пропсов) в компонентах. Это позволяет избежать ошибок связанных с ложными сравнениями, приведением типов, да и вообще динамической нетипизированной природой javascript'а. В случае если в компонент придет props отличающийся от задекларированного, или не придет обязательный props - браузер сообщит нам в консоли об ошибке и предоставит исчерпывающую информацию о ней.

#### Dev.Enviroment & file structure.
Файловая структура проекта имеет следующий вид:  
* client - клиентский javascript код
  * components - компоненты отвечающие за отображение данных
  * containers - компоненты отвечающие за работу с данными и общение с сервером
  * shared - вспомогательные функции и общие стили/шрифты
* graphql - GraphQL - описание типов/мутации/резолверы etc.
* models - модели sequelize.
* node_modules - установленные dependencies.
* pages - единственный статичный роут express который отдает index.html с тремя строчками кода.
* public - собранный билд.

Расскажу немного про зависимости:  

Мы будем использовать webpack для сборки. В сообществе разработчиков он очень популярен и показал себя надежным инструментом. Установим его с помощью npm и начнем конфигурацию. Планируется две версии билда, мы используем cross-env для разделения. Первая версия будет работать в watch режиме и блокировать консоль, быстро перекомпилировать изменения при сохранении файлов. Вторая собирает весь наш JSX минифицирует его с помощью Uglify.js (плагина для вебпака), и устанавливает продакшен окружение. Подобный подход позволяет нам *значительно* снизить объем bundle.js который необходимо будет загрузить нашему пользователю. 1,8 мб дев. версии против 510kb минифицированной. Так же подключим в конфигурацию вебпака лоадеры для статики, файлов (SVG/PNG/шрифты) и подключим ноду транспайлера Babel для того чтобы у нас была возможность писать код в современном ECMAScript2015. Стили у нас будут собираться из папок компонентов-представлений (там они лежат в виде .scss файлов к каждому компоненту), в процессе сборки они будут перекомпилироваться node-sass препроцессором и собираться вебпаком в один .css файл.

За кодстайл у нас будет отвечать ESlint, я использую VSCode редактор там есть отличный плагин для линтера, который позволяет форматировать код джаваскрипта сразу по указанному стандарту кодстайла. Будем использовать airbnb паттерн для соблюдения чистоты кода.

Компонент календаря создавать собственноручно у меня не было достаточно времени, поэтому мы добавим немного материал-дизайна в наш проект и подгрузим календарь от mui, локализовав его и стилизовав его в цвета нашего SPA. При этом требования на дату в 3 месяца будут соблюдены и он будет гармонично интегрирован в приложение.  

apollo-fetch - это очень удобная клиентская библиотека для работы с GraphQL, которая позволяет нам осуществлять запросы на сервер (и queries и mutations).

#### Containers logic:
У каждого контейнера есть прокси-компонент с одноименным названием в папке components,
*App* - контейнер является точкой входа в наше приложение и аргументом в render функции react-dom. Более того, App исполняет роль роутера по приложению, определяет состояние модального окна создания встречи, и является двусторонним посредником данных (родителем) между контейнерами Workplace и CreateMeeting. От Workplace к CreateMeeting передаются данные о цели входа в контейнер CreateMeeting (создание/редактирование), точки входа (таймлайн зона/кнопка) и сопроводительная нагрузка payload. Наоборот от CreateMeeting опосредованно к Workplace передаются данные о созданной комнате для показа текста в модальном окне. Контейнер App передает в свой компонент-представление информацию необходимую для условного рендеринга больших частей приложения (Таймзона/Хедер/Редактирование)  
  
*CreateMeeting* - этот контейнер отвечает за обработку всех данных связаных с созданием и редактированием событий/встреч и функционированием страницы создания/редактирования. Тут же расположенна функция getRecommended() реализовать которую было необходимо в соответствии с ТЗ. componentWillMount - это стандартный метод компонента реакта, который до маунтинга компонента в дом дерево позволяет получить некоторые данные и обработать их. В любом случае к graphQL совершается запрос для получения пользователей для селект-листа и в зависимости от того, с какой точки входа пользователь вошел в компонент создания встреч выполняется одно из трех действий: а) Предустанавливаются данные для комнаты выбранной на таймлайне. б) Создается комната с нуля в случае клика по кнопке в хедере (текущее время + 1 час). с) Устанавливается режим редактирования и данные редактируемой комнаты. Есть множество мелких функций отвечающих за изменение стейта (вроде установки даты/времени) все их описывать слишком долго (хотя если было бы время я бы задокументировал бы их назначение в коде).Э то функции отвечающие за props'ы дочерних компонентов-представлений, открыт ли селект-лист, откыта ли модалка, какие кнопки показать в футере, список рекоменованных переговорок и прочие. Внимания заслуживает функция getRecommended(). Я запускаю ее через метод-адаптер tryToGetRecommended(), чтобы обеспечить на вход функции необходимые аргументы указанные в интерфейсе ТЗ.   

 Алгоритм следующий:  
1. Если выбраны участники - фильтруются все известные комнаты на подходящее количество мест. Отфильтрованные комнаты проходят дальше, если таких комнат нет - выдается сообщение о невозможности создания встречи с таким количеством человек.
2. Далее мы фильтруем комнаты с достаточной емкостью по событиям уже существующим в этой комнате, если событий в комнате нет или имеющиеся события по отрезку времени не имеют пересечений с создаваемым событием - значит комната в это время свободна и имеет достаточную емкость, следовательно она попадает в рекомендации.
3. В случае, если свободных комнат на это время с достаточной емкостью нет мы ищем кандидатов на swap, для этого мы берем отфильтрованные по количеству комнаты. Фильтруему их по пересечению с соседними событиями. Создаем хэшмеп куда будем определять параметры для нашего swap-объекта. Далее от лица комнат с соседними событиями и данных этих событий ищем цели для swap'а. Они должны подходить по количеству человек (нельзя перенести событие с 6 людьми в комнату с емкостью в 4 человека, например). Если кандидаты на свап найдены - c помощью рассчитанного хешмапа определяем им swap свойство - где лежит объект с id-таргетом комнаты и id-события для переноса. Комната со свапом попадает в рекомендацию и выделяется значком свапа. Так же для успешного свапа необходимо будет подтверждение.
4. Любые полученные комнаты для рекомендации сортируются по количеству пройденных людьми этажей. Там просто небольшая редьюс функция для сортировки аккумулирующая модуль разницы между домом пользователя и этажом комнаты.  

После выбора комнаты, и нажатия всех кнопок подтверждений (в зависимости от точки входа на контейнер) совершаются действия (редактирование/создание/удаление) происходят необходимые мутации и редирект на главную.

*WorkplaceContainer* - контейнер отвечающий за работу на таймлайн области на главной странице. Отвечает за получение данных, пагинацию по датам, хендлит клики по рабочим областям, переводит координаты во время и наоборот. Отвечает за подсветку заголовков у комнат. На самом деле разработка этого контейнера и вообще вся эта идея с таймлайном и переводом пикселей в дату-время и наоборот оказалась довольно непростой. Пикселы в дату перевести легко, судя по задумке дизайнера, 57.5px на десткопе - это один час времени. Обратную формулу я рассчитывал с помощью Wolfram Math., спасибо аспирантуре - хороший инструмент для своих задач. В случае Workplace контейнера большое количество джаваскрипта не связанного с получением-мутацией данных, а связанного именно с перерасчетом времени-пространства и граничными условиями находится в InteractiveArea компоненте. Там проект еще не горел и код был немного задокументирован. Должно быть более-менее понятно. Хочу заметить, что для рендеринга рабочей зоны мы используем SVG и при динамике изменяем свойства элементов translate. Это намного производительнее чем изменять DOM дерево и, в добавок, хорошо поддерживается GPU.   

Немного труда вложенно в функцию morphRoomsToFloorsArray, поскольку дизайнер нарисовал комнаты сгруппированные по этажам (причем в порядке от самого высокого к нижнему) для вывода подобным образом пришлось изменять структуру данных массива rooms. Алгоритм следующий:  
1. Отправляем данные в функцию которая раздает подсветку faded занятым на сегодня и прошлым таймлайнам, там разрешаем Promise (об этом будет ниже). Полученные данные идентичны за исключением одного не влияющего на алгоритм свойства.
2. Сортируем все комнаты по этажам с верхнего по нижний.
3. Создаем пустой массив (этажи), временный указатель (текущий этаж) и временное хранилище данных для объекта вида этаж - комнаты.
4. Итерируем отсортированные комнаты, если это первая комната то временному указателю присваивается этаж этой комнаты, сама комната попадает во временный объект описанный выше.
5. Иначе - если этаж текущей комнаты совпадает с этажом предыдущей (временный указатель), мы кладем комнату в стек свойства временного массива.
6. Если этаж не совпадает с предыдущим мы пушим объект в массив floors, переустанавливаем указатель, устанавливаем временный объект с нуля и продолжаем итерацию.
7. Если комната последняя в списке объект с этажом и стеком комнат пушится в floors.

Последнее, что стоит внимания с точки зрения алгоритмов это Faded заголовки комнат при занятом таймлайне.  
1. Мы мапим список комнат, с целью присвоения объекту room свойства faded (true или false) в зависимости от того затемнять лейбл или нет  
2. Если день вчерашний - уже faded, так как события в прошлое создавать нельзя. Это не логично.
3. Если день сегодняшний - мы фильтруем все имеющиесся события в комнатах на таймлайне при этом соблюдая помня о том, что заполненность слева от синей линии (текущего времени) не идет в счет, по дефолтному она считается заполненной.
4. Далее мы делим оставшийся отрезок (от текущего времени до 23 часов) на маленькие отрезки времени, и ищем пересечения этих отрезков с событиями в текущей комнате на протяжении вышеуказанного отрезка слева-направо. Если хотя бы одно пересечение с существующими встречами не было найденно, значит в эту комнату можно вставить этот маленький отрезок - значит она свободна. Если каждый из маленьких отрезков нашел пересечение - комната занята на весь период до конца дня. Постараюсь завтра вставить картинки иллюстрирующие визуализацию того - чего я там написал.
5. В зависимости от результата работы алгоритма присваивается свойство faded, Promise разрешен и данные отправляются обратно в morphRoomsToFloorsArray.

Эти две функции выполняются каждый раз при пагинации по таймлайну с помощью календаря или кнопок. Возможно как-то можно оптимизировать этот момент, но я пока не знаю как.
### Подведем итоги.

Нам удалось: Разработать десткопную *и мобильные версии* SPA Яндекс-переговорки.  

Что хотелось бы сделать еще:
1. Приложение претендует на real-time решение, возможно тут хорошо зайдет технология вебсокет, чтобы полученные из базы комнаты сразу появлялись у всех пользователей на экранах открытой страницы таймлайна. Тогда можно и реализовать движение линии текущего времени real-time, для этого достаточно ререндерить компонент раз в минуту, например. Вызов с помощью setInterval this.forceUpdate() в компоненте InteractiveArea решит проблему. Пока комнаты не появляются в этом просто нет смысла.
2. Мобильная версия интерфейса, не успел ее доверстать, но пока вы это читаете я скорее всего занимаюсь этим. So sad. Не придется возится с алгоритмами, но придется мерить паддинги.

*upd: 17 jan 00:02 как и обещал - доделал мобильную версию* 

3. Авторизация с помощью, например JWT, и страница для аутентификации в таком приложении - необходимы. Если любой может взять и перенести вас или удалить вашу встречу какой в этом смысл? Каждый должен иметь право перенести/удалить только свою встречу, а если произошел swap, на электронку swap'нутого человека должно прийти письмо.
4. Профиль пользователя/установка аватарки, смены пароля сюда же.

Спасибо вам за вашу работу. Читать чужой код всегда тяжелее чем писать свой.
Хорошего дня, коллеги.