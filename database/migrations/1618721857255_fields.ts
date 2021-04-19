import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Fields extends BaseSchema {
  protected tableName = 'fields'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 45)
      table.enum('type', ['soccer', 'minisoccer', 'futsal', 'basketball', 'volleyball'])
      table.integer('venue_id').unsigned().references('id').inTable('venues')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
