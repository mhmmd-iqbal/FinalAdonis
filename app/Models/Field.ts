import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Venue from './Venue'

export default class Field extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public venueId: number

  @belongsTo(() => Venue)
  public venue: BelongsTo<typeof Venue>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
