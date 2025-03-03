
import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Index
  @Column
  email: string;

  @Column
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at: Date;
}
