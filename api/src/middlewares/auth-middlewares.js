const { JwtPayload, sign, verify } = require ('jsonwebtoken');
const { compare } = require ('bcrypt');
const User = require ('../domains/users/models/User');
const PermissionError = require ('../../errors/PermissionError');
const statusCodes = require ('../../utils/constants/statusCodes');
const getEnv = require ('../../utils/functions/getEnv');

function generateJWT(user, res) {
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

function cookieExtractor(req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

async function loginMiddleware(req, res, next) {
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

function notLoggedIn(req, res, next) {
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

function verifyJWT(req, res, next) {
  try {
    const token = cookieExtractor(req);
    if (token) {
      const decoded = verify(token, getEnv('SECRET_KEY'));
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

function checkRole(role) {
  return function(req, res, next) {
    try {
      if (role.includes(req.user.role)) {
        next();
      } else {
        throw new PermissionError(
          'Você não tem permissão para realizar essa ação!');
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  loginMiddleware,
  verifyJWT,
  checkRole,
  notLoggedIn,
};