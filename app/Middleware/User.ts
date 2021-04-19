import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class User {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (auth.user?.role === 'user') {
      await next()
    }
  }
}
