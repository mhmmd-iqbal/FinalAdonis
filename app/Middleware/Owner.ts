import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Owner {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (auth.user?.role === 'owner') {
      await next()
    }
  }
}
