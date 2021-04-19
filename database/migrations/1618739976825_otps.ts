import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Otps extends BaseSchema {
  protected tableName = 'otps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 5)
      table.boolean('is_used').defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
