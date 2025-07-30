import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task-entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    // if we have any filters defined, call taskService.getTasksWithFilters(filters);
    // else, call taskService.getAllTasks();
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  // @Get()
  // getAllTasks(): Promise<Task[]> {
  //   return this.taskService.getAllTasks();
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    // call taskService.updateTaskStatus(id, status);
    return this.taskService.updateTaskStatus(id, status);
  }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   // if we have any filters defined, call taskService.getTasksWithFilters(filters);
  //   // else, call taskService.getAllTasks();
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }
  //FIRST METHOD
  //   @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);
  //   }

  //SECOND METHOD
  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     return this.taskService.createTask(title, description);
  //   }
  //THIRD METHOD
  //   @Post()
  //   createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //     return this.taskService.createTask(createTaskDto);
  //   }

  //   @Get('/:id')
  //   getTaskById(@Param('id') id: string): Task | undefined {
  //     return this.taskService.getTaskById(id);
  //   }

  //   @Delete('/:id')
  //   deleteTask(@Param('id') id: string): void {
  //     return this.taskService.deleteTask(id);
  //   }
  //   @Patch('/:id/status')
  //   updateTaskStatus(
  //     @Param('id') id: string,
  //     @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  //   ): Task {
  //     const { status } = updateTaskStatusDto;
  //     // call taskService.updateTaskStatus(id, status);
  //     return this.taskService.updateTaskStatus(id, status);
  //   }
  // }
}
