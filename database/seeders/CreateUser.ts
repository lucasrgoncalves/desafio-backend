import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {

  public static developmentOnly = true

  public async run() {
    await User.create({
      name: 'Fulano da Silva',
      email: 'fulano@email.com',
      password: '123456',
      birthday: new Date('1990-01-01'),
      initial_value: 120.00
    })

    await User.create({
      name: 'Ciclano de Souza',
      email: 'ciclano@email.com',
      password: '654321',
      birthday: new Date('1995-12-22'),
      initial_value: 25.00
    })
  }
}
