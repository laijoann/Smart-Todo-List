
exports.seed = function(knex, Promise) {
  return knex('tododb')
    .then(function () {
      return Promise.all([
        knex('tododb').insert({id: 1, todo: 'Harry Potter', category: 'watch', usersid: 1}),
        knex('tododb').insert({id: 2, todo: 'Dress', category: 'buy', usersid: 1}),
        knex('tododb').insert({id: 3, todo: 'Tim Hortons', category: 'eat', usersid: 2}),
        knex('tododb').insert({id: 4, todo: 'Lord of the Rings', category: 'read', usersid: 3}),
      ]);
    });
};
