import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movement from 'App/Repositories/Movement'
import MovementValidator from 'App/Validators/MovementValidator'

const movementRepository = new Movement()

export default class MovementsController {

  public async index({ }: HttpContextContract) {
    return await movementRepository.index()
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(MovementValidator)
    const movementStore = await movementRepository.store(request)

    if (!movementStore) {
      return response.status(404).send({ message: "Não foi possível cadastrar movimentação." })
    }

    return response.status(201).send(movementStore)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    let userDestroy = await movementRepository.destroy(params, request.only(['movement_id']))

    if (!userDestroy) {
      return response.status(404).send({ message: "Não foi possível excluir" })
    }

    return response.status(200).send({ message: `Movimentação ID ${userDestroy} excluída com sucesso!` })
  }

  public async sumMovements({ params, response }: HttpContextContract) {
    let sum = await movementRepository.sum(params)

    if (!sum) {
      return response.status(404).send("Não foram encontradas movimentações.")
    }

    return response.status(200).send({ sum: sum })
  }

  public async export({ request, response }: HttpContextContract) {
    let exportMovements = await movementRepository.export(request)

    if (!exportMovements || exportMovements == 'error') {
      return response.status(404)
    }

    return response.status(200).send({ message: 'Relatório de Movimentações gerado com sucesso!', path: exportMovements })
  }
}
