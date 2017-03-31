
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('tododb').del(),
    knex('usersdb').del()
  ])
};
