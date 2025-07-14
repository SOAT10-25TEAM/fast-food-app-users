// src/repositories/UserRepository.ts

import { UserModel } from '../models/user.schema';

export class UserRepository {
  async findByCPF(cpf: string) {
    return UserModel.findOne({ cpf });
  }

  async create(data: { name: string; cpf: string; email: string }) {
    const user = new UserModel(data);
    return await user.save();
  }
  async findAll() {
    return UserModel.find();
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async update(id: string, userData: any) {
    return UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}
