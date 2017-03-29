exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('masterdb', function(table){
      table.increments('id').primary();
      table.string('todo');
      table.string('category');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('masterdb')
  ])
};
