const { models, sequelize } = require('./models');

function createData() {
  const usersPromise = models.User.bulkCreate([
    {
      login: 'veged',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      homeFloor: 0,
    },
    {
      login: 'alt-j',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
      homeFloor: 3,
    },
    {
      login: 'yeti-or',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
      homeFloor: 2,
    },
    {
      login: 'Тор Одинович',
      avatarUrl: 'https://s1.stabroeknews.com/images/2014/11/20141120chrishemsworth.jpg',
      homeFloor: 6,
    },
    {
      login: 'Лекс Лютер',
      avatarUrl: 'https://vignette.wikia.nocookie.net/zlodei/images/0/03/5.jpg/revision/latest?cb=20140101124250&path-prefix=ru',
      homeFloor: 5,
    },
    {
      login: 'Томас Андерсон',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/4c/Neo2.jpg/220px-Neo2.jpg',
      homeFloor: 2,
    },
    {
      login: 'Дарт Вейдер',
      avatarUrl: 'http://drivejet.ru/wp-content/uploads/2017/11/d5db8e92_shutterstock_239338216.xxxlarge_2x-230x153.jpg',
      homeFloor: 1,
    },
  ]);

  const roomsPromise = models.Room.bulkCreate([
    {
      title: '404',
      capacity: 5,
      floor: 4,
    },
    {
      title: 'Деньги',
      capacity: 4,
      floor: 2,
    },
    {
      title: 'Карты',
      capacity: 4,
      floor: 2,
    },
    {
      title: 'Два ствола',
      capacity: 2,
      floor: 2,
    },
    {
      title: 'Комната для дуэлей',
      floor: 6,
      capacity: 2,
    },
  ]);

  const HOUR = 60 * 60 * 1000;
  const now = new Date();
  const oneHourBefore = new Date(now.getTime() - HOUR * 5);
  const oneHourLater = new Date(now.getTime() - HOUR * 4);
  const twoHoursLater = new Date(oneHourLater.getTime() + HOUR);
  const threeHoursLater = new Date(twoHoursLater.getTime() + HOUR);
  const fiveHoursLater = new Date(now.getTime() + 5 * HOUR);

  const eventsPromise = models.Event.bulkCreate([
    {
      title: 'ШРИ 2018 - начало',
      dateStart: now,
      dateEnd: oneHourLater,
    },
    {
      title: '👾 Хакатон 👾',
      dateStart: oneHourLater,
      dateEnd: twoHoursLater,
    },
    {
      title: '🍨 Пробуем kefir.js',
      dateStart: twoHoursLater,
      dateEnd: threeHoursLater,
    },
    {
      title: 'Звездные разборки',
      dateStart: oneHourBefore,
      dateEnd: fiveHoursLater,
    },
  ]);

  Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Room.findAll(),
      models.Event.findAll(),
    ]))
    .then(([users, rooms, events]) => {
      const promises = [];
      promises.push(events[0].setRoom(rooms[0]));
      promises.push(events[1].setRoom(rooms[1]));
      promises.push(events[2].setRoom(rooms[2]));
      promises.push(events[3].setRoom(rooms[4]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));
      promises.push(events[3].setUsers([users[3], users[6]]));

      return Promise.all(promises);
    });
}

sequelize.sync()
  .then(createData);
