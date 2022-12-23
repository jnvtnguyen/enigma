import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectUserTable1671771568496 implements MigrationInterface {
    name = 'CreateProjectUserTable1671771568496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project_user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`project_id\` int NOT NULL, \`project_permission\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project_user\` ADD CONSTRAINT \`FK_2a781b3f2de389d1c6ea41f48f5\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_user\` DROP FOREIGN KEY \`FK_2a781b3f2de389d1c6ea41f48f5\``);
        await queryRunner.query(`DROP TABLE \`project_user\``);
    }

}
