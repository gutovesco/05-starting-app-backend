import {Router} from 'express'
import CreateUserService from '@modules/users/services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import {container} from 'tsyringe'


const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {


  try{
    const {name, email, password} = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password

    return response.json(user)
  }
  catch(err){
    return response.status(400).json({error: err.message})
  }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  //mostra todas as informações do arquivo
  console.log(request.file);


    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user)

})

export default usersRouter
