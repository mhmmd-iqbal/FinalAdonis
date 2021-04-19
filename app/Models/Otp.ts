import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Otp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code?: string

  @column()
  public isUsed?: boolean

  @column()
  public user_id?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
