import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Field from 'App/Models/Field'
import FieldValidator from 'App/Validators/FieldValidator'

export default class FieldsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ params, request, response }: HttpContextContract) {
    const { id } = params
    const input = await request.validate(FieldValidator)
    try {
      await Field.create({
        venueId: id,
        name: input.name,
        type: input.type,
      })

      return response.status(200).json({
        status: 'success',
        message: 'Create Data',
      })
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: error,
      })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
