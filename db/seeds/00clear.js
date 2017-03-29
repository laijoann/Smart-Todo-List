
exports.seed = function(knex, Promise) {
  return knex('usersdb').del();
};
