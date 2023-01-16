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
import { AdminModule } from './admin/admin.module';
import { Config } from './shared/entities/Config.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('PG_HOST');
        return {
          type: 'postgres',
          host: host,
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'pedia',
          useNewUrlParser: true,
          logging: true,
          entities: [Article, Category, Config],
          synchronize: false,
          maxQueryExecutionTime: 5000,
        };
      },
    }),
    CategoryModule,
    ArticleModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
