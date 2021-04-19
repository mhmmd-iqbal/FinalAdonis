import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Otp from 'App/Models/Otp'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
  public async login({ response, request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const UserData = await User.query().where('email', email).where('is_active', true).first()
    if (UserData === null) {
      return response.status(400).json({
        status: 'error',
        message: 'User Not Found',
      })
    } else {
      const token = await auth.use('api').attempt(email, password)
      return token.toJSON()
    }
  }

  public async verification({ response, request }: HttpContextContract) {
    const otp = request.input('otp')
    const otpData = await Otp.query().where('code', otp).where('is_used', false).first()
    if (otpData === null) {
      return response.status(200).json({
        status: 'error',
        message: 'OTP Tidak Valid',
      })
    } else {
      await Otp.query().where('code', otp).update({
        is_used: 1,
      })
      await User.query().where('id', otpData.user_id).update({
        is_active: 1,
      })
      return response.status(200).json({
        status: 'success',
        message: 'User Telah Aktif',
      })
    }
  }

  public async register({ response, request }: HttpContextContract) {
    const otpGenerator = require('otp-generator')
    const input = await request.validate(UserValidator)
    const otpCode = otpGenerator.generate(5, { upperCase: false, specialChars: false })
    const trx = await Database.transaction()
    try {
      const userData = await User.create({
        name: input.name,
        email: input.email,
        password: input.password,
        role: input.role,
      })

      await Otp.create({
        code: otpCode,
        user_id: userData.id,
      })

      Mail.send((message) => {
        message
          .from('admin@example.com')
          .to(input.email)
          .subject('Email OTP')
          .htmlView('emails/otp_verification', { otp: otpCode })
      })

      await trx.transaction()
      await trx.commit()
      return response.status(200).json({
        status: 'Success',
        message: 'Kode OTP telah dikirimkan ke email anda',
      })
    } catch (error) {
      await trx.rollback()
      return response.status(422).json({
        status: 'Failed: ',
        message: error,
      })
    }
  }
}
