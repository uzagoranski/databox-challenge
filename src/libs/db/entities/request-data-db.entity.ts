import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { Metric } from '../../../shared/interfaces/metric.interface'

@Entity('request_data')
export class RequestDataDB {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column({ type: 'enum', enum: ServiceProvider })
    serviceProvider!: ServiceProvider

  @UpdateDateColumn()
    timeOfSending!: Date

  @Column({ type: 'json' })
    metricsSent!: Metric[]

  @Column()
    numberOfKPIsSent!: number

  @Column()
    successfulRequest!: boolean

  @Column({ nullable: true })
    errorMessage?: string | null
}
