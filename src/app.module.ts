import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './entity/user.entity';
import { BookModule } from './book/book.module';
import { Book } from './entity/book.entity';
import { GenreModule } from './genre/genre.module';
import { Genre } from './entity/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abror.08082008',
      database: 'baza',
      entities: [User, Book, Genre],
      synchronize: true,
    }),
    UserModule,
    BookModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
