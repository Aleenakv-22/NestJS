import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';
// import { Task } from './tasks/task-entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'todo',
      username: 'postgres',
      password: 'postgres',
      autoLoadModels: true,
      synchronize: true, // Note: Set to false in production
    }),
    TasksModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
