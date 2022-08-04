import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {
    public async index({ }: HttpContextContract) {
        return await Account.query().preload('user')
    }

    public async store({ request, response }: HttpContextContract) {
        let data = request.only(['user_id', 'number'])
        let newAccount = await Account.create(data)
        await newAccount.load('user')
        return response.status(201).send(newAccount)
    }

    public async show({ params, response }: HttpContextContract) {
        let { id } = params

        let account = await Account.query().where('id', id).preload('user')

        if (account && account.length == 0) {
            return response.status(404)
        }

        return account
    }

    public async update({ request, response }: HttpContextContract) {
        let { id } = request.params()

        let account = await Account.find(id)

        if (!account) {
            return response.status(404)
        }

        let data = request.only(['user_id', 'number'])

        account.merge(data)
        await (await (await account.save()).refresh()).load('user')

        return response.status(200).send(account)
    }

    public async destroy({ params, response }: HttpContextContract) {
        let { id } = params

        let account = await Account.find(id)

        if (!account) {
            return response.status(404)
        }

        await account!.delete()
        return response.status(200).send({ message: `Conta ID ${id} excluída com sucesso!` })
    }
}
