import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Movement from 'App/Models/Movement'

export default class extends BaseSeeder {

  public static developmentOnly = true

  public async run () {
    await Movement.create({
      account_id: 1,
      type_id: 1,
      value: 250.00,
      previousBalance: 250.00,
      currentBalance: 250.00
    })

    await Movement.create({
      account_id: 1,
      type_id: 2,
      value: 550.00,
      previousBalance: 550.00,
      currentBalance: 550.00
    })

    await Movement.create({
      account_id: 1,
      type_id: 3,
      value: 50.00,
      previousBalance: 50.00,
      currentBalance: 50.00
    })

    await Movement.create({
      account_id: 2,
      type_id: 1,
      value: 250.00,
      previousBalance: 250.00,
      currentBalance: 250.00
    })

    await Movement.create({
      account_id: 2,
      type_id: 2,
      value: 550.00,
      previousBalance: 550.00,
      currentBalance: 550.00
    })

    await Movement.create({
      account_id: 2,
      type_id: 3,
      value: 50,
      previousBalance: 50.00,
      currentBalance: 50.00
    })
  }
}
