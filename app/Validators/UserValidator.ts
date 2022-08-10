import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string([rules.required()]),
    email: schema.string([rules.required()]),
    password: schema.string([rules.required()]),
    birthday: schema.date({ format: 'yyyy-MM-dd' }),
    initial_value: schema.number([rules.required()])
  })

  public messages: CustomMessages = {
    'required': 'Campo obrigatório',
    'number': 'Permitido apenas números',
    'birthday.date.format': 'Formato de data inválido'
  }
}
