import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/entity/genre.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(@InjectRepository(Genre) private genre: Repository<Genre>) {}
  create(createGenreDto: CreateGenreDto) {
    try {
      let created = this.genre.create(createGenreDto);
      return this.genre.save(created);
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
  
        const [users, total] = await this.genre.findAndCount({
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
      let data = await this.genre.findBy({ id });
      return data;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    try {
      let data = await this.genre.update(id, updateGenreDto);
      let one = await this.genre.findOne({ where: { id } });
      return data;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
   try {
     let one = await this.genre.findOne({ where: { id } });
     let data = await this.genre.delete(id);
      return one;
    } catch (error) {
      return error;
    }
  }
  }

