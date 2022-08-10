import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
  }

  public async me({ auth, response }: HttpContextContract) {
    let loggedInUser = auth.user

    return await response.json({ user: loggedInUser })
  }
}
