import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}
  
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async create(createUserDto): Promise<User> {
    const user = this.userModel.build(createUserDto);
    return user.save();
  }

  findOne(id: string) {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

    

  // async remove(id: string): Promise<void> {
  //   const user = await this.findOne(id);
  //   await user.destroy();
  // }
}
