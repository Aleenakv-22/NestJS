import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Task } from 'src/tasks/task-entity';

@Table({ paranoid: true, timestamps: true })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  declare username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
