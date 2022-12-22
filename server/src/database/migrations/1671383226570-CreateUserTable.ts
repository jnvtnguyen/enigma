import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1671383226570 implements MigrationInterface {
  name = 'CreateUserTable1671383226570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
