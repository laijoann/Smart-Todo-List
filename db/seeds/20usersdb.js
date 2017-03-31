exports.seed = function(knex, Promise) {
  return knex('usersdb')
    .then(function () {
      return Promise.all([
        knex('usersdb').insert({name: 'Sharon', email: 'sharon@s.com', password: '12345', cookie: '1'}),
        knex('usersdb').insert({name: 'Karen', email: 'karen@k.com', password: '54321', cookie: '2'}),
        knex('usersdb').insert({name: 'Trevor', email: 'trevor@t.com', password: '22342', cookie: '3'}),
        knex('usersdb').insert({name: 'Finn', email: 'finn@f.com', password: '32453', cookie: '4'}),
        knex('usersdb').insert({name: 'Cersei', email: 'cersei@c.com', password: '24564', cookie: '5'}),
        knex('usersdb').insert({name: 'Ramsay', email: 'ramsay@r.com', password: '21323', cookie: '6'}),
        knex('usersdb').insert({name: 'Ursula', email: 'ursula@u.com', password: '54221', cookie: '7'}),
        knex('usersdb').insert({name: 'Neville', email: 'neville@n.com', password: '21321', cookie: '8'}),
        knex('usersdb').insert({name: 'Frank', email: 'frank@f.com', password: '12314', cookie: '9'}),
        knex('usersdb').insert({name: 'Juan', email: 'juan@j.com', password: '55421', cookie: '10'}),
      ]);
    });
};
