import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Venue from 'App/Models/Venue'
import VenueValidator from 'App/Validators/VenueValidator'

export default class VenuesController {
  public async index({ auth, response, request }: HttpContextContract) {
    const venues = await Venue.all()
    return response.status(200).json({
      data: venues,
    })
  }

  public async store({ auth, response, request }: HttpContextContract) {
    const input = await request.validate(VenueValidator)
    try {
      await Venue.create({
        name: input.name,
        phone: input.phone,
        address: input.address,
        userId: auth.user?.id,
      })
      return response.status(200).json({
        status: 'success',
        message: 'Berhasil Menambahkan Data',
      })
    } catch (error) {
      return response.status(401).json({
        status: 'error',
        message: error,
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const id = params.id
    const data = await Venue.query().where('id', id).preload('bookings')
    return response.status(200).json({
      status: 'success',
      data: data,
    })
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const { id } = params
    const input = await request.validate(VenueValidator)
    try {
      await Venue.query().where('id', id).update({
        name: input.name,
        phone: input.phone,
        address: input.address,
        user_id: auth.user?.id,
      })
      return response.status(200).json({
        status: 'success',
        message: 'Berhasil Mengubah Data',
      })
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: error,
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    let id = params.id
    try {
      await Venue.query().where('id', id).delete()
      return response.status(200).json([
        {
          status: 'success',
          message: 'Deleted Data',
        },
      ])
    } catch (error) {
      return response.status(401).json({
        status: 'error',
        message: error,
      })
    }
  }
}
