import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('authentication')
export class AuthenticationEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    accessToken!: string

  @Column()
    accessTokenExpiresAt!: Date

  @Column()
    refreshToken!: string
}
