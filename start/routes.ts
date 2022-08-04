import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  
  Route.post('/login', 'AuthController.login')

  Route.group(() => {
    
    Route.get('/logout', 'AuthController.logout')
    Route.get('/me', 'AuthController.me')
    
    Route.resource('users', 'UsersController').apiOnly()
    
    Route.resource('accounts', 'AccountsController').apiOnly()

    Route.resource('movements', 'MovementsController').apiOnly()
    Route.get('sumMovements/:user_id', 'MovementsController.sumMovements')
    
  }).middleware('auth')

}).prefix('/api')