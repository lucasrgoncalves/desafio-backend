import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserUpdateValueValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    initial_value: schema.number([rules.required()])
  })

  public messages: CustomMessages = {
    'required': 'Campo obrigatório',
    'number': 'Permitido apenas números'
  }
}
