import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  hasMany,
  HasMany,
  hasManyThrough,
  HasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import Field from './Field'
import Booking from './Booking'

export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public address: string

  @column()
  public userId: number

  @hasMany(() => Field)
  public fields: HasMany<typeof Field>

  @hasManyThrough([() => Booking, () => Field])
  public bookings: HasManyThrough<typeof Booking>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
