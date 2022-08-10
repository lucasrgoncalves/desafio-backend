import AccountModel from 'App/Models/Account'
import MovementModel from 'App/Models/Movement'

export default class Account {
  public async index() {
    return await AccountModel.query().preload('user').paginate(1, 10)
  }

  public async store(data) {
    let validateNumberAccount = await AccountModel.query().where('number', data.number)

    if (validateNumberAccount.length > 0) {
      return
    }

    let newAccount = await AccountModel.create(data)
    await newAccount.load('user')
    return newAccount
  }

  public async show(params) {
    let { id } = params
    let account = await AccountModel.query().where('id', id).preload('user')
    return account
  }

  public async update(request) {
    let { id } = request.params()
    let account = await AccountModel.find(id)

    if (!account) {
      return id
    }

    let data = request.only(['user_id', 'number'])

    account!.merge(data)
    await account!.save()
    await account!.refresh()
    await account!.load('user')
    return account
  }

  public async destroy(params) {
    let account = await AccountModel.find(params.id)

    if (!account) {
      return { cod: 404, id: params.id }
    }

    let movements = await MovementModel.query().where('account_id', account.id)

    if (movements && movements.length > 0) {
      return { cod: 304, id: params.id }
    }

    await account!.delete()
    return params.id
  }
}
