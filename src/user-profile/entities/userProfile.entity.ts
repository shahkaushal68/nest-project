import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({type: 'varchar', nullable: true})
  profilePicture: string;

  @Column({type: 'varchar', nullable: true})
  phoneNumber: string;
  
  @Column({type: 'varchar', nullable: true})
  bio: string;

  @Column({type: 'varchar', nullable: true})
  addressLine1: string;

  @Column({type: 'varchar', nullable: true})
  addressLine2: string;

  @Column({type: 'varchar', nullable: true})
  city: string;

  @Column({type: 'varchar', nullable: true})
  state: string;

  @Column({type: 'int', nullable: true})
  zipcode: string;

  @Column({type: 'varchar', nullable: true})
  dateOfBirth: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt: Date; 

  @UpdateDateColumn()
  updatedAt: Date; 
}
