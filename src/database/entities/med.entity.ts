import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Med {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cis_code: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'text', array: true })
  to_use: string[];

  @Column()
  status: string;

  @Column()
  process_type: string;

  @Column('boolean')
  shoppable: boolean;

  @Column({ nullable: true, type: 'date' })
  date_of_shop: Date;

  @Column({ nullable: true })
  availabity_status: string;

  @Column({ nullable: true })
  auth_number: string;

  @Column({ type: 'text', array: true })
  owners: string[];

  @Column()
  enforce_warning: boolean;
}
