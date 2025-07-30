import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task-entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Op } from 'sequelize';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskModel.findByPk(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskModel.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    });
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const found = await this.getTaskById(id);
    await this.taskModel.destroy({ where: { id: found.id } });
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.dataValues.status = status;
    // await task.save();
    await this.taskModel.update({ status }, { where: { id } });
    // Alternatively, you can use
    return task;
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    return this.taskModel.findAll({ where });

    // Debug: log what you are querying for
    // console.log('DEBUG where:', where);

    // try {
    //   return await this.taskModel.findAll({ where });
    // } catch (error) {
    //   console.error('Sequelize error:', error);
    //   throw error;
    // }
  }
}
//   private tasks: Task[] = [];

//   getAllTasks(): Task[] {
//     return this.tasks;
//   }
//   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//     const { status, search } = filterDto;

//     // define a temporary array to hold the result
//     let tasks = this.getAllTasks();
//     // do something with status
//     if (status) {
//       tasks = tasks.filter((task) => task.status === status);
//     }
//     // do something with search
//     if (search) {
//       tasks = tasks.filter((task) => {
//         if (task.title.includes(search) || task.description.includes(search)) {
//           return true;
//         }
//         return false;
//       });
//     }
//     // return final result
//     return tasks;
//   }

//   getTaskById(id: string): Task {
//     // try to get task
//     const found = this.tasks.find((task) => task.id === id);
//     //if not found, throw an error (404 not found)
//     if (!found) {
//       throw new NotFoundException('Task with ID "${id}" not found');
//     }
//     //otherwise, return the found task
//     return found;
//   }
//   createTask(createTaskDto: CreateTaskDto): Task {
//     const { title, description } = createTaskDto;
//     const task: Task = {
//       id: uuidv4(),
//       title,
//       description,
//       status: TaskStatus.OPEN,
//     };
//     this.tasks.push(task);
//     return task;
//   }

//   deleteTask(id: string): void {
//     const found = this.getTaskById(id);
//     this.tasks.filter((task) => task.id !== found.id);
//   }

//   updateTaskStatus(id: string, status: TaskStatus) {
//     const task = this.getTaskById(id);
//     if (!task) {
//       throw new NotFoundException(`Task with ID "${id}" not found`);
//     }
//     task.status = status;
//     return task;
//   }
// }
