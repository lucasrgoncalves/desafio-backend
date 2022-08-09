import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import MovementType from './MovementType'
import Account from './Account'

export default class Movement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public account_id: number

  @column()
  public type_id: number

  @column()
  public value: number

  @column()
  public previousBalance: number

  @column()
  public currentBalance: number

  @belongsTo(() => Account, {
    foreignKey: 'account_id',
  })

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => MovementType, {
    foreignKey: 'type_id',
  })

  @belongsTo(() => MovementType)
  public type: BelongsTo<typeof MovementType>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
