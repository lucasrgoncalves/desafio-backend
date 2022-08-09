import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Repositories/Account'
const accountRepository = new Account()

export default class AccountsController {
    public async index({ }: HttpContextContract) {
        return await accountRepository.index()
    }

    public async store({ request, response }: HttpContextContract) {
        let newAccount = await accountRepository.store(request.only(['user_id', 'number']))
        return response.status(201).send(newAccount)
    }

    public async show({ params, response }: HttpContextContract) {
        let showAccount = await accountRepository.show(params)
        if (showAccount.length == 0) {
            return response.status(404).send({ message: `Conta ID ${params.id} não encontrada.` })
        }
        return showAccount
    }

    public async update({ request, response }: HttpContextContract) {
        let updateAccount = await accountRepository.update(request)
        
        if (updateAccount > 0) {
            return response.status(404).send({ message: `ID ${updateAccount} inválido.` })
        }

        return updateAccount
    }

    public async destroy({ params, response }: HttpContextContract) {
        let destroyAccount = await accountRepository.destroy(params)

        if (destroyAccount.error) {
            return response.status(404).send({ message: `ID ${destroyAccount.id} inválido.` })
        }

        return response.status(200).send({ message: `Conta ID ${destroyAccount} excluída com sucesso!` })
    }
}
