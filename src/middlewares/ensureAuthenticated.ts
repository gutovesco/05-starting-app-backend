import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'

interface TokenPayload{
  iat: number,
  exp: number,
  sub: string
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{
  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new Error('JWT Token is missing!')
  }

  const [, token] = authHeader.split(' ')

  try{
    const decoded = verify(token, '3920a7f35a2ee83798365df6ba230711')

    const {sub} = decoded as TokenPayload

    request.user = {
      id: sub,
    }

    return next()
  }
  catch(err){
    throw new Error('Invalid JWT Token')
  }
}
