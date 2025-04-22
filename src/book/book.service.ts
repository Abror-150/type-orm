import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entity/book.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private book: Repository<Book>) {}
  create(createBookDto: CreateBookDto) {
    try {
      let created = this.book.create({
        ...createBookDto,
        user: createBookDto.user ? { id: createBookDto.user } : undefined,
      });
      return this.book.save(created);
    } catch (error) {
      return error;
    }
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

      const [users, total] = await this.book.findAndCount({
        relations: ['user', 'genre'],
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
      let data = await this.book.findBy({ id });
      return data;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      let data = await this.book.update(id, {
        ...updateBookDto,
        user: updateBookDto.user ? { id: updateBookDto.user } : undefined,
      });
      let one = await this.book.findOne({ where: { id } });
      return one;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      let one = await this.book.findOne({ where: { id } });
      let deleted = await this.book.delete(id);
      return one;
    } catch (error) {
      return error;
    }
  }
}
