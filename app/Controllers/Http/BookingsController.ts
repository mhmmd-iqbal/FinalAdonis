import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Booking from 'App/Models/Booking'
import User from 'App/Models/User'
import BookingValidator from 'App/Validators/BookingValidator'

export default class BookingsController {
  public async store({ params, request, response }: HttpContextContract) {
    const { id } = params
    const input = await request.validate(BookingValidator)
    try {
      await Booking.create({
        fieldId: id,
        playDateStart: input.play_date_start,
        playDateEnd: input.play_date_end,
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

  public async index({ response }: HttpContextContract) {
    const data = await Booking.query().preload('field', (query) => {
      query.preload('venue')
    })
    return response.status(200).json({
      status: 'success',
      data: data,
    })
  }
  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const data = await Booking.query().where('id', id).preload('users').first()
    return response.status(200).json({
      status: 'success',
      data: data,
    })
  }

  public async join({ params, response, auth }: HttpContextContract) {
    const { id } = params
    const user = await User.find(auth.user?.id)
    const booking = await Booking.find(id)
    try {
      await user.related('bookings').attach([booking.id])
      return response.status(200).json({
        status: 'success',
        message: 'Join Booking',
      })
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: error,
      })
    }
  }

  public async unjoin({ params, response, auth }: HttpContextContract) {
    const { id } = params
    const user = await User.find(auth.user?.id)
    const booking = await Booking.find(id)
    try {
      await user.related('bookings').detach([booking.id])
      return response.status(200).json({
        status: 'success',
        message: 'Unjoin Booking',
      })
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: error,
      })
    }
  }
  public async schedules({ response, auth }: HttpContextContract) {
    const data = await User.query()
      .where('id', auth.user?.id)
      .preload('bookings', (query) => {
        query.preload('field', (subquery) => {
          subquery.preload('venue')
        })
      })
      .first()
    return response.status(200).json({
      status: 'success',
      data: data,
    })
  }
}
