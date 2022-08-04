import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ }: HttpContextContract) {
    return await User.all()
  }

  public async store({ request, response }: HttpContextContract) {
    let data = request.only(['name', 'email', 'password', 'birthday'])

    let newUser = await User.create(data)

    return response.status(201).send({ user: newUser })
  }

  public async show({ params, response }: HttpContextContract) {
    let { id } = params

    let user = await User.find(id)

    if (!user) {
      return response.status(404)
    }

    return user
  }

  public async update({ request, response }: HttpContextContract) {
    let { id } = request.params()

    let user = await User.find(id)

    if (!user) {
      return response.status(404)
    }

    let data = request.only(['name', 'email', 'password', 'birthday'])

    user.merge(data)
    await user.save()
    await user.refresh()

    return response.status(200).send({ user: user })
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    let { id } = params

    let user = await User.find(id)

    if (!user || auth.user!.id == user.id) {
      return response.status(404)
    }

    await user!.delete()
    return response.status(200).send({ message: `Usuário ID ${id} excluído com sucesso!` })
  }

}
