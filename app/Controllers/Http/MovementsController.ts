import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Account from 'App/Models/Account'
import Movement from "App/Models/Movement"
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MovementsController {

    public async index({ }: HttpContextContract) {
        return await Movement.query().preload('account').preload('type').paginate(1, 10)
    }

    public async store({ request, response }: HttpContextContract) {
        let data = request.only(['account_id', 'type_id', 'value'])

        let newMovement = await Movement.create(data)

        await newMovement.load('account')
        await newMovement.load('type')

        return response.status(201).send(newMovement)
    }

    public async destroy({ params, response }: HttpContextContract) {
        let { id } = params

        let movement = await Movement.find(id)

        if (!movement) {
            return response.status(404)
        }

        await movement!.delete()
        return response.status(200).send({ message: `Movimentação ID ${id} excluída com sucesso!` })
    }

    public async sumMovements({ params, response }: HttpContextContract) {
        let { user_id } = params

        let debito = 0
        let credito = 0
        let estorno = 0
        let soma = 0

        let user = await User.find(user_id)
        let account = await Account.find(user_id)

        if (!user || !account) {
            return response.status(404).send("Não foram encontradas movimentações.")
        }

        let data = await Database.from('movements').select('type_id')
            .select(
                Database
                    .raw(`SUM (value) as soma`)
            )
            .where('account_id', account.id)
            .groupBy('movements.type_id')

        for (const dat of data) {
            if (dat.type_id == 1) {
                debito += dat.soma
            }
            if (dat.type_id == 2) {
                credito += dat.soma
            }
            if (dat.type_id == 3) {
                estorno += dat.soma
            }
        }

        soma = (credito - debito) + estorno + user.initial_value

        return response.status(200).send({soma: soma})
    }
}
