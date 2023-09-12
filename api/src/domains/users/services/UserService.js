const bcrypt = require('bcrypt');
const User = require('../models/User');
const NotAuthorizedError = require('../../../../errors/NotAuthorizedError');
const PermissionError = require('../../../../errors/PermissionError');
const InvalidParamError = require('../../../../errors/InvalidParamError');
const QueryError = require('../../../../errors/QueryError');
const TokenError = require('../../../../errors/TokenError');


class UserService {
    async encryptPassword(password) {
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        return encryptedPassword;
    }

    async create(body) {
        if (body.role == "admin") {
            throw new PermissionError("Não é possível criar um usuário com o perfil de administrador");
        }

        const user = await User.findOne({where: {email: body.email}});
    
        if (user) {
        throw new QueryError('E-mail já cadastrado!');
        }

        const newUser = {
          name: body.name,
          email: body.email,
          password: body.password,
          role: body.role,
        };
        newUser.password = await this.encryptPassword(newUser.password);
        await User.create(newUser);
    }

    async getAll() {
        const users = await User.findAll({
          attributes: ['id', 'name', 'email', 'role'],
        });
        if (!users) {
          throw new QueryError('Não há nenhum usuário cadastrado');
        }
        return users;
    }

    async getById(id) {
        const user = await User.findByPk(id, {attributes:
          {
            exclude: ['password', 'createdAt', 'updatedAt'],
          }});
        if (!user) {
          throw new QueryError(`Não há um usuário com o ID ${id}!`);
        }
        return user;
    }

    async update(id, body, loggedUser){
        if (loggedUser.role != userRoles.admin && loggedUser.id != id) {
          throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
        }
    
        if (body.role && loggedUser.role != userRoles.admin && loggedUser.role != body.role) {
          throw new NotAuthorizedError('Você não tem permissão para editar seu cargo!');
        }
    
        const user = await this.getById(id);
        
        if (body.password) {
          body.password = await this.encryptPassword(body.password);
        }
    
        await user.update(body);
    }
    
    async delete(id, idReqUser) {
        if (idReqUser == id) {
          throw new PermissionError('Não é possível deletar o próprio usuário!');
        }
        
        const user = await this.getById(id);
        await user.destroy();
    }
}

module.exports = new UserService;