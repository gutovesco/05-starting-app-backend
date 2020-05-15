import {getRepository} from 'typeorm'
import User from '../infra/typeorm/entities/User'
import path from 'path'
import uploadConfig from '../../../config/upload'
import fs from 'fs'
import AppError from '../../../shared/errors/AppError'

interface Request{
  user_id: string,
  avatarFilename: string
}

class UpdateUserAvatarService{
  public async execute({user_id, avatarFilename}: Request): Promise<User>{
    // pega os repositórios
    const usersRepository = getRepository(User)

    //pega o usuario de acordo com o id
    const user = await usersRepository.findOne(user_id)

    if(!user){
      throw new AppError('Only authenticated user can change the avatar!', 401)
    }

    //se tiver avatar pega o path do avatar
    if(user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      //se o arquivo de avatar existir deleta o arquivo e o nome
      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    //o usuario recebe o novo avatar
    user.avatar = avatarFilename

    //salva o novo avatar dentro do repositório
    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
