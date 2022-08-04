import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Account from 'App/Models/Account'

export default class extends BaseSeeder {
  
  public static developmentOnly = true

  public async run () {
    await Account.create({
      userId: 1,
      number: 100
    })

    await Account.create({
      userId: 2,
      number: 101
    })
  }
}
