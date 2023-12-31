import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1694893537057 implements MigrationInterface {
  name = 'Migration1694893537057'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`request_data\` (\`id\` varchar(36) NOT NULL, \`serviceProvider\` enum ('GitHub', 'CoinCap') NOT NULL, \`timeOfSending\` varchar(255) NOT NULL, \`metricsSent\` json NOT NULL, \`numberOfKPIsSent\` int NOT NULL, \`successfulRequest\` tinyint NOT NULL, \`errorMessage\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`request_data\``)
  }
}
