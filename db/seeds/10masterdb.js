
exports.seed = function(knex, Promise) {
  return knex('masterdb').del()
    .then(function () {
      return Promise.all([
        knex('masterdb').insert({todo: 'Deadpool', category: 'watch'}),
        knex('masterdb').insert({todo: 'Jaws', category: 'watch'}),
        knex('masterdb').insert({todo: 'Gone With the Wind', category: 'watch'}),
        knex('masterdb').insert({todo: 'Star Wars', category: 'watch'}),
        knex('masterdb').insert({todo: 'Elf', category: 'watch'}),
        knex('masterdb').insert({todo: 'Harry Potter', category: 'watch'}),
        knex('masterdb').insert({todo: 'Lord of the Rings', category: 'read'}),
        knex('masterdb').insert({todo: 'Catcher in the Rye', category: 'read'}),
        knex('masterdb').insert({todo: 'Moby Dick', category: 'read'}),
        knex('masterdb').insert({todo: 'The Bible', category: 'read'}),
        knex('masterdb').insert({todo: 'Heart of Darkness', category: 'read'}),
        knex('masterdb').insert({todo: 'Paradise Lost', category: 'read'}),
        knex('masterdb').insert({todo: 'McDonalds', category: 'eat'}),
        knex('masterdb').insert({todo: 'Burrito Boyz', category: 'eat'}),
        knex('masterdb').insert({todo: 'Bahn Mi Boys', category: 'eat'}),
        knex('masterdb').insert({todo: 'Tim Hortons', category: 'eat'}),
        knex('masterdb').insert({todo: 'SU&BU', category: 'eat'}),
        knex('masterdb').insert({todo: 'Sweet Jesus', category: 'eat'}),
        knex('masterdb').insert({todo: 'Dress', category: 'buy'}),
        knex('masterdb').insert({todo: 'Pants', category: 'buy'}),
        knex('masterdb').insert({todo: 'Socks', category: 'buy'}),
        knex('masterdb').insert({todo: 'Tie', category: 'buy'}),
        knex('masterdb').insert({todo: 'Boots', category: 'buy'}),
        knex('masterdb').insert({todo: 'Watch', category: 'buy'})
      ]);
    });
};
