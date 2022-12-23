import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectTable1671665045890 implements MigrationInterface {
  name = 'CreateProjectTable1671665045890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`project\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`owner_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_1cf56b10b23971cfd07e4fc6126\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_1cf56b10b23971cfd07e4fc6126\``
    );
    await queryRunner.query(`DROP TABLE \`project\``);
  }
}
