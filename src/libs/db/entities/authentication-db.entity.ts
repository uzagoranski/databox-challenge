import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('authentication')
export class AuthenticationDB {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    accessToken!: string

  @Column()
    accessTokenExpiresAt!: Date

  @Column()
    refreshToken!: string
}
