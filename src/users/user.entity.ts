import { Column, Entity, ObjectIdColumn } from "typeorm";
import { UserRoles } from "../shared/user-roles";

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn()
  id: number;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'string', unique: true })
  email: string;

  @Column({ type: 'string' })
  password: string;

  @Column()
  role: UserRoles;

  @Column()
  accessToken: string;
}
