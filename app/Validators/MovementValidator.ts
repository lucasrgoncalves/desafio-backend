import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MovementValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    account_id: schema.number([rules.required()]),
    type_id: schema.number([rules.required()]),
    value: schema.number([rules.required()])
  })

  public messages: CustomMessages = {
    'required': 'Campo obrigatório',
    'number': 'Permitido apenas números'
  }
}
