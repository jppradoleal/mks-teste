import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, default: true })
    isActive: boolean;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    confirmationToken: string;
  
    @Column({ nullable: true, type: 'varchar', length: 64 })
    recoverToken: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
