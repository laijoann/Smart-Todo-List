
exports.seed = function(knex, Promise) {
  return knex('masterdb').del()
    .then(function () {
      return Promise.all([
        knex('masterdb').insert({id: 1, todo: 'Deadpool', category: 'watch'}),
        knex('masterdb').insert({id: 2, todo: 'Jaws', category: 'watch'}),
        knex('masterdb').insert({id: 3, todo: 'Gone With the Wind', category: 'watch'}),
        knex('masterdb').insert({id: 4, todo: 'Star Wars', category: 'watch'}),
        knex('masterdb').insert({id: 5, todo: 'Elf', category: 'watch'}),
        knex('masterdb').insert({id: 6, todo: 'Harry Potter', category: 'watch'}),
        knex('masterdb').insert({id: 7, todo: 'Lord of the Rings', category: 'read'}),
        knex('masterdb').insert({id: 8, todo: 'Catcher in the Rye', category: 'read'}),
        knex('masterdb').insert({id: 9, todo: 'Moby Dick', category: 'read'}),
        knex('masterdb').insert({id: 10, todo: 'The Bible', category: 'read'}),
        knex('masterdb').insert({id: 11, todo: 'Heart of Darkness', category: 'read'}),
        knex('masterdb').insert({id: 12, todo: 'Paradise Lost', category: 'read'}),
        knex('masterdb').insert({id: 13, todo: 'McDonalds', category: 'eat'}),
        knex('masterdb').insert({id: 14, todo: 'Burrito Boyz', category: 'eat'}),
        knex('masterdb').insert({id: 15, todo: 'Bahn Mi Boys', category: 'eat'}),
        knex('masterdb').insert({id: 16, todo: 'Tim Hortons', category: 'eat'}),
        knex('masterdb').insert({id: 17, todo: 'SU&BU', category: 'eat'}),
        knex('masterdb').insert({id: 18, todo: 'Sweet Jesus', category: 'eat'}),
        knex('masterdb').insert({id: 19, todo: 'Dress', category: 'buy'}),
        knex('masterdb').insert({id: 20, todo: 'Pants', category: 'buy'}),
        knex('masterdb').insert({id: 21, todo: 'Socks', category: 'buy'}),
        knex('masterdb').insert({id: 22, todo: 'Tie', category: 'buy'}),
        knex('masterdb').insert({id: 23, todo: 'Boots', category: 'buy'}),
        knex('masterdb').insert({id: 24, todo: 'Watch', category: 'buy'})
      ]);
    });
};
