import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1694938953785 implements MigrationInterface {
  name = 'Migration1694938953785'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`authentication\` (\`id\` varchar(36) NOT NULL, \`accessToken\` varchar(255) NOT NULL, \`accessTokenExpiresAt\` datetime NOT NULL, \`refreshToken\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`request_data\` DROP COLUMN \`timeOfSending\``)
    await queryRunner.query(`ALTER TABLE \`request_data\` ADD \`timeOfSending\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`request_data\` DROP COLUMN \`timeOfSending\``)
    await queryRunner.query(`ALTER TABLE \`request_data\` ADD \`timeOfSending\` varchar(255) NOT NULL`)
    await queryRunner.query(`DROP TABLE \`authentication\``)
  }
}
