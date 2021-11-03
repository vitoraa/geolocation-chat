import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  id: number;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'string' })
  password: string;

  @Column({ type: 'string' })
  role: string;
}
