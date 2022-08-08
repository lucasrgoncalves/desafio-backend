import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'movements'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('previous_balance').defaultTo(0)
      table.decimal('current_balance').defaultTo(0)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('previous_balance')
      table.dropColumn('current_balance')
    })
  }
}
