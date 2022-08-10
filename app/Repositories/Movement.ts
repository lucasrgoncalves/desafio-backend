import MovementModel from "App/Models/Movement"
import Database from '@ioc:Adonis/Lucid/Database'
import UserModel from "App/Models/User"
import AccountModel from "App/Models/Account"
import fs from 'fs'
import xl from 'excel4node'

export default class Movement {
  public async index() {
    return await MovementModel.query().preload('account', (queryAccount) => {
      queryAccount.preload('user')
    })
      .preload('type')
      .paginate(1, 10)
  }

  public async store(request) {
    let data = request.only(['account_id', 'type_id', 'value', 'previousBalance', 'currentBalance'])
    let account = await AccountModel.query().where('id', data.account_id)

    if (!account || account.length == 0) {
      return
    }

    let sum = await this.sumBalance(data)

    let newMovement = await MovementModel.create({
      account_id: data.account_id,
      type_id: data.type_id,
      value: data.value,
      previousBalance: sum.previous > 0 ? sum.previous : data.value,
      currentBalance: sum.current > 0 ? sum.current : data.value
    })

    await newMovement.load('account')
    await newMovement.load('type')

    return newMovement
  }

  private async sumBalance(data) {
    let previousData = await MovementModel.query().orderBy('id', 'desc').first()

    let previous = previousData!.currentBalance > 0 ? previousData!.currentBalance : 0
    let current = 0
    let dataBalance = data.currentBalance && data.currentBalance > 0 ? data.currentBalance : previousData!.currentBalance

    if (data.currentBalance && data.currentBalance > 0 || previousData!.currentBalance && previousData!.currentBalance > 0) {

      if (data.type_id === 1) {
        current = dataBalance - data.value
      } else if (data.type_id === 2 || data.type_id === 3) {
        current = dataBalance + data.value
      }
    }
    return { previous: previous, current: current }
  }

  public async destroy(params, request) {
    let validated = await this.validateParamsDestroy(params, request)

    if (validated.status == true) {
      return request.movement_id
    } else {
      return
    }
  }

  private async validateParamsDestroy(params, request) {
    let user = await UserModel.query().where('id', params.id).first()
    let movement = await MovementModel.query().where('id', request.movement_id).preload('account').first()

    if (movement && user && movement.account.userId == user.id) {
      await movement.delete()
      return { status: true }
    } else {
      return { status: false }
    }
  }

  public async sum(params, account_id?) {
    let debit = 0
    let credit = 0
    let refound = 0
    let soma = 0
    let account: any
    let user: any

    if (params.user_id) {
      user = await UserModel.find(params.user_id)
      account = await AccountModel.find(params.user_id)
    } else {
      account = await AccountModel.find(account_id)
      user = await UserModel.find(account.userId)
    }

    if (!user || !account) {
      return
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
        debit += dat.soma
      }
      if (dat.type_id == 2) {
        credit += dat.soma
      }
      if (dat.type_id == 3) {
        refound += dat.soma
      }
    }

    soma = (credit - debit) + refound + user.initial_value
    return soma
  }

  public async export(request) {
    let movements = await this.verifyFilters(request)

    if (movements == 'error' || !movements) {
      return "error"
    }

    return movements
  }

  private async verifyFilters(data) {
    let movements: any
    let filter = data.all()

    if (filter && filter.all) {
      movements = await MovementModel.query().preload('type').preload('account', (roleQuery) => {
        roleQuery.preload('user')
      })
    } else if (filter && filter.days) {
      let previous = new Date()
      let actual = new Date()
      previous.setDate(actual.getDate() - filter.days)

      movements = await MovementModel
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

      movements = await MovementModel
        .query()
        .where((builder) => {
          builder.where('created_at', 'like', `%${search}%`)
        })
        .preload('type').preload('account', (roleQuery) => {
          roleQuery.preload('user')
        })
    } else {
      return "error"
    }

    if (movements && movements.length > 0) {
      let prepareCsv = await this.mountCsv(movements)
      return prepareCsv
    } else {
      return "error"
    }
  }

  private async mountCsv(data) {
    const wb = new xl.Workbook()
    const ws = wb.addWorksheet('Relatorios')
    const dir = "./relatorios"
    const date = new Date()

    let operation = ""
    let movementData = new Array()

    const headingColumnNames = [
      'Nome',
      'N° da Conta',
      'Tipo de Operação',
      'Valor Movimentação',
      'Data Operação',
      'Saldo Inicial',
      'E-mail',
      'Saldo Anterior',
      'Saldo Atual'
    ]

    for (let i in data) {
      if (data[i].type_id == 1) {
        operation = 'Débito'
      } else if (data[i].type_id == 2) {
        operation = 'Crédito'
      } else {
        operation = 'Estorno'
      }

      movementData[i] = {
        "Nome": `${data[i].account.user.name}`,
        "N° da Conta": `${data[i].account.number}`,
        "Tipo de Operação": `${operation}`,
        "Valor Movimentação": `${data[i].value}`,
        "Data Operação": `${data[i].createdAt}`,
        "Saldo Inicial": `${data[i].account.user.initial_value}`,
        "E-mail": `${data[i].account.user.email}`,
        "Saldo Anterior": `${data[i].previousBalance}`,
        "Saldo Atual": `${data[i].currentBalance}`
      }
    }

    let headingColumnIndex = 1
    headingColumnNames.forEach(heading => {
      ws.cell(1, headingColumnIndex++).string(heading)
    })

    let rowIndex = 2
    movementData.forEach(record => {
      let columnIndex = 1
      Object.keys(record).forEach(columnName => {
        ws.cell(rowIndex, columnIndex++)
          .string(record[columnName])
      })
      rowIndex++
    })

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    const dateNow =
      date.getFullYear() + '-' +
      date.getMonth() + '-' +
      date.getDate() + '-' +
      date.getHours() + '-' +
      date.getMinutes() + '-' +
      date.getSeconds()

    const path = `${dir}/relatorio-movimentacoes-${dateNow}.csv`
    wb.write(path)

    return path
  }
}
