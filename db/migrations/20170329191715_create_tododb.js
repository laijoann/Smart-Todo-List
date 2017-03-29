exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tododb', function(table){
      table.increments('id').primary();
      table.string('todo');
      table.string('category');
      table.integer('usersid').unsigned().references('id').inTable('usersdb').onDelete('CASCADE');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tododb')
  ])
};
