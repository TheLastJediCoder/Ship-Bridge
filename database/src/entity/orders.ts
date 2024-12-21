import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Users } from "./users";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @OneToOne(() => Users)
  // @JoinColumn()
  // buyer: Users;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn()
  creator: Users;
}
