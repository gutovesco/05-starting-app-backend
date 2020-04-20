import User from '../models/User'
import {getRepository} from 'typeorm'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface Request{
  email: string,
  password: string
}

export default class AuthenticateUserService{
  public async execute({ email, password}: Request): Promise<{user: User, token: string}>{
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({where: {email}})

    if(!user){
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare (password, user.password)

    if(!passwordMatched){
      throw new Error('Incorrect email/password combination')
    }

    const token = sign({}, '3920a7f35a2ee83798365df6ba230711', {
      subject: user.id,
      expiresIn: '1d'
    })

    delete user.password

    return {
      user,
      token
    }
  }
}
