import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  manyToMany,
  ManyToMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Field from './Field'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public playDateStart: DateTime

  @column.dateTime()
  public playDateEnd: DateTime

  @column()
  public fieldId: number

  @belongsTo(() => Field)
  public field: BelongsTo<typeof Field>

  @manyToMany(() => User, {
    pivotTable: 'booking_users',
  })
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
