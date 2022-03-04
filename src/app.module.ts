import { ArticleModule } from './article/article.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from './shared/entities/Article.entity';
import { Category } from './shared/entities/Category.entity';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const url = configService.get<string>('MONGODB_URI');
        return {
          type: 'mongodb',
          url: url,
          useNewUrlParser: true,
          logging: true,
          entities: [Article, Category],
          synchronize: false,
          maxQueryExecutionTime: 5000,
        };
      },
    }),
    CategoryModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
