import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BookingUsers extends BaseSchema {
  protected tableName = 'booking_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('booking_id').unsigned().references('id').inTable('bookings')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
