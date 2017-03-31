
exports.seed = function(knex, Promise) {
  return knex('tododb')
    .then(function () {
      return Promise.all([
        knex('tododb').insert({todo: 'Harry Potter', category: 'watch', usersid: 1}),
        knex('tododb').insert({todo: 'Dress', category: 'buy', usersid: 1}),
        knex('tododb').insert({todo: 'Tim Hortons', category: 'eat', usersid: 2}),
        knex('tododb').insert({todo: 'Lord of the Rings', category: 'read', usersid: 3}),
      ]);
    });
};
