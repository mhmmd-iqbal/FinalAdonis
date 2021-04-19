/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
  Route.post('/otp-confirmation', 'AuthController.verification')
  Route.group(() => {
    Route.group(() => {
      Route.resource('/venues', 'VenuesController').apiOnly()
      Route.post('/venues/:id/fields', 'FieldsController.store')
      Route.post('/fields/:id/bookings', 'BookingsController.store')
    }).middleware('owner')
    Route.group(() => {
      Route.get('/bookings', 'BookingsController.index')
      Route.get('/bookings/:id', 'BookingsController.show')
      Route.put('/bookings/:id/join', 'BookingsController.join')
      Route.put('/bookings/:id/unjoin', 'BookingsController.unjoin')
      Route.get('/schedules', 'BookingsController.schedules')
    })
  }).middleware('auth')
}).prefix('/api/v1')
