// src/modules/User/gateways/userGateway.ts

import { User } from "../entities/user";
import { UserRepository as IUserRepository } from "../interfaces/repositories";
import { UserRepository } from "../../repositories/UserRepository";

export class UserGateway implements IUserRepository {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findByCPF(cpf: string): Promise<User | null> {
    try {
      const userData = await this.userRepository.findByCPF(cpf);
      if (!userData) return null;

      return User.create(
        userData.id.toString(),
        userData.name,
        userData.cpf,
        userData.email
      );
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  }

  async create(data: { name: string; cpf: string; email: string }): Promise<User> {
    try {
      const newUser = await this.userRepository.create(data);

      const createdUser = User.create(
        newUser.id.toString(),
        newUser.name,
        newUser.cpf,
        newUser.email
      );
      if (!createdUser) {
        throw new Error("Erro ao criar usuário: dados inválidos");
      }
      return createdUser;
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error}`);
    }
  }
}
