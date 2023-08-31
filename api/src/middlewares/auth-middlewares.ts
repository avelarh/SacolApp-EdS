import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { User } from '../domains/users/models/User';
import { PermissionError } from '../../errors/PermissionError';
import { statusCodes } from '../../utils/constants/status-codes';
import { PayloadParams } from '../domains/users/types/PayloadParams';
import { Request, Response, NextFunction } from 'express';
import { getEnv } from '../../utils/functions/get-env';

function generateJWT(user: PayloadParams, res: Response) {
  const body = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  
  const token = sign({ user: body }, getEnv('SECRET_KEY'), { expiresIn: getEnv('JWT_EXPIRATION')});
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: getEnv('NODE_ENV') !== 'development',
  });
}

function cookieExtractor(req: Request) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      throw new PermissionError('E-mail e/ou senha incorretos!');
    }

    const matchingPassword = await compare(req.body.password, user.password);
    if (!matchingPassword) {
      throw new PermissionError('E-mail e/ou senha incorretos!');
    }

    generateJWT(user, res);

    res.status(statusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
}

export function notLoggedIn(req: Request, res: Response, next: NextFunction) {
  try {
    const token = cookieExtractor(req);

    if (token) {
      const decoded = verify(token, getEnv('SECRET_KEY'));
      if (decoded) {
        throw new PermissionError('Você já está logado no sistema!');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  try {
    const token = cookieExtractor(req);
    if (token) {
      const decoded = verify(token, getEnv('SECRET_KEY')) as JwtPayload;
      req.user = decoded.user;
    }

    if (!req.user) {
      throw new PermissionError(
        'Você precisa estar logado para realizar essa ação!');
    }
    next();
  } catch (error) {
    next(error);
  }
}

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      ! roles.includes(req.user!.role) ? res.json('Você não possui permissão para realizar essa ação') : next();
    } catch(error){
      next(error);
    }

  };
};