import User from '../infra/typeorm/entities/User'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import {injectable, inject} from 'tsyringe'

interface Request{
  email: string,
  password: string
}

@injectable()
export default class AuthenticateUserService{
  constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository
  ){}

  public async execute({ email, password}: Request): Promise<{user: User, token: string}>{

    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare (password, user.password)

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination', 401)
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
