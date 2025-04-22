import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    try {
      let created = this.user.create(createUserDto);

      return this.user.save(created);
    } catch (error) {}
  }

  async findAll(query: any) {
    try {
      const {
        name,
        sortBy = 'name',
        sortOrder = 'asc',
        page = 1,
        limit = 10,
      } = query;

      const filter: any = {};
      if (name) {
        filter.name = ILike(`%${name}%`);
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const [users, total] = await this.user.findAndCount({
        where: filter,
        order: {
          [sortBy]: sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
        },
        skip,
        take: parseInt(limit),
      });

      return {
        data: users,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      };
    } catch (error) {
      throw new Error(error.message || 'Error while fetching users');
    }
  }
  async findOne(id: number) {
    try {
      let data = await this.user.findBy({ id });
      return data;
    } catch (error) {
      return error;
    } 
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let data = await this.user.update(id, updateUserDto);
      let one = await this.user.findOne({ where: { id } });
      return one;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      let one = await this.user.findOne({ where: { id } });
      let deleted = await this.user.delete(id);
      return one;
    } catch (error) {
      return error;
    }
  }
}
