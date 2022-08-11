import AccountModel from "App/Models/Account"
import UserModel from "App/Models/User"

export default class User {

  public async index() {
    return await UserModel.query().orderBy('id', 'desc').paginate(1, 10)
  }

  public async store(data) {

    let values = data.birthday.split("-")
    let yearBirthday = values[0]
    let year = new Date()
    let actualyear = year.getFullYear()

    if (actualyear - yearBirthday < 18) {
      return "menor"
    }

    let newUser = await UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
      birthday: data.birthday,
      initial_value: data.initial_value
    })

    return newUser
  }

  public async show(data) {
    let { id } = data

    let user = await UserModel.find(id)
    return user
  }

  public async update(params, data) {
    let user = await UserModel.find(params.id)

    user!.merge(data)
    await user!.save()
    await user!.refresh()

    return user
  }

  public async destroy(params, auth) {
    let user = await UserModel.find(params.id)

    let account = user && user.id ? await AccountModel.query().where('user_id', user!.id) : null

    if (!user || !account || auth.user!.id == user.id || account.length > 0) {
      return
    }

    await user.delete()
    return params.id
  }

  public async updateInitialValue(params, request) {
    let user = await UserModel.find(params.id)

    if (!user) {
      return
    }

    user!.merge(request)
    await user!.save()
    await user!.refresh()

    return user
  }
}
