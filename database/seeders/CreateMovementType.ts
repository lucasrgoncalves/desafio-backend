import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MovementType from 'App/Models/MovementType'

export default class extends BaseSeeder {

  public static developmentOnly = true

  public async run () {
    await MovementType.create({
      description: 'Débito'
    })

    await MovementType.create({
      description: 'Crédito'
    })

    await MovementType.create({
      description: 'Estorno'
    })
  }
}
