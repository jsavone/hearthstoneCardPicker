
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cards",(table)=>{
   table.increments(); // Creates id column
   table.integer("mana");
   table.integer("attack");
   table.integer("health");
   table.string("description");
   table.timestamps(true, true); // Creates created_at and updated_at columns to use as timestamps
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cards");
};
