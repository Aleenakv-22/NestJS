//This is a DTO (Data Transfer Object) for creating a task in a task management application.
//It defines the structure of the data that is expected when creating a new task.

import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
