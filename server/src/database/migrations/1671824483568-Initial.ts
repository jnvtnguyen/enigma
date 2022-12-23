import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1671824483568 implements MigrationInterface {
    name = 'Initial1671824483568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`access_token\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`project_id\` int NOT NULL, \`project_permission\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`workspace_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_group_user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`group_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_group\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`workspace_id\` int NOT NULL, \`default_permission\` enum ('read', 'write', 'admin') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`owner_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`owner_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`workspace_id\` int NOT NULL, \`key\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`access_token\` ADD CONSTRAINT \`FK_4bd9bc00776919370526766eb43\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_user\` ADD CONSTRAINT \`FK_2a781b3f2de389d1c6ea41f48f5\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_user\` ADD CONSTRAINT \`FK_cb830469656d51ce772872fc9d0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_user\` ADD CONSTRAINT \`FK_b312f71c6b1049d0455261f39dc\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_group_user\` ADD CONSTRAINT \`FK_073c454a732a204fe80f628fbfb\` FOREIGN KEY (\`user_id\`) REFERENCES \`workspace_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_group_user\` ADD CONSTRAINT \`FK_07418b194e4a677e6df61ddaa87\` FOREIGN KEY (\`group_id\`) REFERENCES \`workspace_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_group\` ADD CONSTRAINT \`FK_b093e2ff1aba56135cf1d24ddae\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD CONSTRAINT \`FK_988cf8ee530a5f8a2d56269955b\` FOREIGN KEY (\`owner_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_5cb157e3d3ab8abd16251129dba\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d40afe32d1d771bea7a5f468185\` FOREIGN KEY (\`owner_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d40afe32d1d771bea7a5f468185\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_5cb157e3d3ab8abd16251129dba\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP FOREIGN KEY \`FK_988cf8ee530a5f8a2d56269955b\``);
        await queryRunner.query(`ALTER TABLE \`workspace_group\` DROP FOREIGN KEY \`FK_b093e2ff1aba56135cf1d24ddae\``);
        await queryRunner.query(`ALTER TABLE \`workspace_group_user\` DROP FOREIGN KEY \`FK_07418b194e4a677e6df61ddaa87\``);
        await queryRunner.query(`ALTER TABLE \`workspace_group_user\` DROP FOREIGN KEY \`FK_073c454a732a204fe80f628fbfb\``);
        await queryRunner.query(`ALTER TABLE \`workspace_user\` DROP FOREIGN KEY \`FK_b312f71c6b1049d0455261f39dc\``);
        await queryRunner.query(`ALTER TABLE \`workspace_user\` DROP FOREIGN KEY \`FK_cb830469656d51ce772872fc9d0\``);
        await queryRunner.query(`ALTER TABLE \`project_user\` DROP FOREIGN KEY \`FK_2a781b3f2de389d1c6ea41f48f5\``);
        await queryRunner.query(`ALTER TABLE \`access_token\` DROP FOREIGN KEY \`FK_4bd9bc00776919370526766eb43\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`workspace\``);
        await queryRunner.query(`DROP TABLE \`workspace_group\``);
        await queryRunner.query(`DROP TABLE \`workspace_group_user\``);
        await queryRunner.query(`DROP TABLE \`workspace_user\``);
        await queryRunner.query(`DROP TABLE \`project_user\``);
        await queryRunner.query(`DROP TABLE \`access_token\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
