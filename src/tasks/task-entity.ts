import {
  Model,
  AllowNull,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';

// @Table({ paranoid: true, timestamps: true })
@Table
export class Task extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({ allowNull: false })
  description: string;

  @Column({
    allowNull: false,
    defaultValue: TaskStatus.OPEN,
    type: DataType.ENUM(...Object.values(TaskStatus)),
  })
  status: TaskStatus;
}
