import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// import Movement from './Movement'

export default class MovementType extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  // @hasMany(() => Movement)
  // public type: HasMany<typeof Movement>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
