import {
  Model,
  AllowNull,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Table({ paranoid: true, timestamps: true })
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

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  @Exclude({ toPlainOnly: true })
  user: User;
}
