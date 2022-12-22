import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccessTokenTable1671406192020 implements MigrationInterface {
  name = 'CreateAccessTokenTable1671406192020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`access_token\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`access_token\` ADD CONSTRAINT \`FK_4bd9bc00776919370526766eb43\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`access_token\` DROP FOREIGN KEY \`FK_4bd9bc00776919370526766eb43\``
    );
    await queryRunner.query(`DROP TABLE \`access_token\``);
  }
}
