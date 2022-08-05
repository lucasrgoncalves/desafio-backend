import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Account from 'App/Models/Account'
import Movement from "App/Models/Movement"
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import fs from 'fs'
import xl from 'excel4node'

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

        return response.status(200).send({ soma: soma })
    }

    public async export({ request, response }: HttpContextContract) {
        //Filtros: all, monthYear, days
        const wb = new xl.Workbook()
        const ws = wb.addWorksheet('Worksheet Name')

        let operation = ""
        let movementData = new Array()
        let movements: any
        let filter = request.all()
        let debito = 0
        let credito = 0
        let estorno = 0
        let soma = 0

        if (filter && filter.all) {
            movements = await Movement.query().preload('type').preload('account', (roleQuery) => {
                roleQuery.preload('user')
            })
        } else if (filter && filter.days) {

            let previous = new Date()
            let actual = new Date()
            previous.setDate(actual.getDate() - filter.days)

            movements = await Movement
                .query()
                .where('created_at', '>', previous)
                .preload('type').preload('account', (roleQuery) => {
                    roleQuery.preload('user')
                })
        } else if (filter && filter.monthYear) {
            let values = filter.monthYear.split("/")
            let month = values[0]
            let year = values[1]
            let search = year + '-' + month

            movements = await Movement
                .query()
                .where((builder) => {
                    builder.where('created_at', 'like', `%${search}%`)
                })
                .preload('type').preload('account', (roleQuery) => {
                    roleQuery.preload('user')
                })
        } else {
            return response.status(404).send({ message: 'Não há movimentações para exibir' })
        }

        const headingColumnNames = [
            'Nome', 'N° da Conta', 'Tipo de Operação', 'Valor Movimentação', 'Data Operação', 'Saldo Inicial', 'E-mail', 'Saldo Atual'
        ]

        // Refatorar ou fazer de outra forma - Ainda está errado

        let dataMovements = await Database.from('movements').select('type_id')
            .select(
                Database
                    .raw(`SUM (value) as soma`)
            )
            .where('account_id', movements[0].account.id)//
            .groupBy('movements.type_id')

        for (const dat of dataMovements) {
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

        soma = (credito - debito) + estorno + movements[0].account.user.initial_value

        //Fim Refatorar

        for (let i in movements) {
            if (movements[i].type_id == 1) {
                operation = 'Débito'
            } else if (movements[i].type_id == 1) {
                operation = 'Crédito'
            } else {
                operation = 'Estorno'
            }


            movementData[i] = {
                "Nome": `${movements[i].account.user.name}`,
                "N° da Conta": `${movements[i].account.number}`,
                "Tipo de Operação": `${operation}`,
                "Valor Movimentação": `${movements[i].value}`,
                "Data Operação": `${movements[i].createdAt}`,
                "Saldo Inicial": `${movements[i].account.user.initial_value}`,
                "E-mail": `${movements[i].account.user.email}`,
                "Saldo Atual": `${soma}`
            }
        }

        let headingColumnIndex = 1; //diz que começará na primeira linha
        headingColumnNames.forEach(heading => { //passa por todos itens do array
            // cria uma célula do tipo string para cada título
            ws.cell(1, headingColumnIndex++).string(heading);
        });

        let rowIndex = 2;
        movementData.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
                ws.cell(rowIndex, columnIndex++)
                    .string(record[columnName])
            });
            rowIndex++;
        })

        const dir = "./relatorios"

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        const date = new Date()
        const dateNow =
            date.getFullYear() + '-' +
            date.getMonth() + '-' +
            date.getDate() + '-' +
            date.getHours() + '-' +
            date.getMinutes() + '-' +
            date.getSeconds()

        const path = `${dir}/relatorio-movimentacoes-${dateNow}.csv`
        wb.write(path)

        return response.status(200).send({ message: 'Relatório de Movimentações gerado com sucesso!', path: path })
    }
}
