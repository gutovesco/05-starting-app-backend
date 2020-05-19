import User from '../infra/typeorm/entities/User'
import {hash} from 'bcryptjs'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface Request{
  name: string,
  email: string,
  password: string
}

export default class CreateUSerService{
  constructor(private usersRepository: IUsersRepository){}
  public async execute({name, email, password}: Request): Promise<User>{

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if(checkUserExists){
      throw new AppError('Email address is already beign used')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}
