import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Venues extends BaseSchema {
  protected tableName = 'venues'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 45)
      table.string('phone', 45)
      table.string('address', 45)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
