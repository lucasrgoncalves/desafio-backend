import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.create({
      name: 'Nome de teste',
      email: 'teste@teste.com',
      password: '123456',
      birthday: new Date('1990-01-01')
    })
  }
}


