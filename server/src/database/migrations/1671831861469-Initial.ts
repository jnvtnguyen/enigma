import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1671831861469 implements MigrationInterface {
    name = 'Initial1671831861469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`access_token\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_group\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`workspace_id\` int NOT NULL, \`default_permission\` enum ('read', 'write', 'admin') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`owner_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`project_id\` int NOT NULL, \`project_permission\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`owner_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`workspace_id\` int NOT NULL, \`key\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_groups_users\` (\`group_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_371eafc0f1d04c1a277138fd65\` (\`group_id\`), INDEX \`IDX_05b29b8ae6507696c6ca11edfb\` (\`user_id\`), PRIMARY KEY (\`group_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspaces_users\` (\`workspace_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_1f5b213d4f56597f813e5c4b97\` (\`workspace_id\`), INDEX \`IDX_5bc64f65c24f7c06ac892c335d\` (\`user_id\`), PRIMARY KEY (\`workspace_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`access_token\` ADD CONSTRAINT \`FK_4bd9bc00776919370526766eb43\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_group\` ADD CONSTRAINT \`FK_b093e2ff1aba56135cf1d24ddae\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD CONSTRAINT \`FK_988cf8ee530a5f8a2d56269955b\` FOREIGN KEY (\`owner_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_user\` ADD CONSTRAINT \`FK_2a781b3f2de389d1c6ea41f48f5\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_5cb157e3d3ab8abd16251129dba\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d40afe32d1d771bea7a5f468185\` FOREIGN KEY (\`owner_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_groups_users\` ADD CONSTRAINT \`FK_371eafc0f1d04c1a277138fd659\` FOREIGN KEY (\`group_id\`) REFERENCES \`workspace_group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`workspace_groups_users\` ADD CONSTRAINT \`FK_05b29b8ae6507696c6ca11edfb4\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`workspaces_users\` ADD CONSTRAINT \`FK_1f5b213d4f56597f813e5c4b97d\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`workspaces_users\` ADD CONSTRAINT \`FK_5bc64f65c24f7c06ac892c335d3\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workspaces_users\` DROP FOREIGN KEY \`FK_5bc64f65c24f7c06ac892c335d3\``);
        await queryRunner.query(`ALTER TABLE \`workspaces_users\` DROP FOREIGN KEY \`FK_1f5b213d4f56597f813e5c4b97d\``);
        await queryRunner.query(`ALTER TABLE \`workspace_groups_users\` DROP FOREIGN KEY \`FK_05b29b8ae6507696c6ca11edfb4\``);
        await queryRunner.query(`ALTER TABLE \`workspace_groups_users\` DROP FOREIGN KEY \`FK_371eafc0f1d04c1a277138fd659\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d40afe32d1d771bea7a5f468185\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_5cb157e3d3ab8abd16251129dba\``);
        await queryRunner.query(`ALTER TABLE \`project_user\` DROP FOREIGN KEY \`FK_2a781b3f2de389d1c6ea41f48f5\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP FOREIGN KEY \`FK_988cf8ee530a5f8a2d56269955b\``);
        await queryRunner.query(`ALTER TABLE \`workspace_group\` DROP FOREIGN KEY \`FK_b093e2ff1aba56135cf1d24ddae\``);
        await queryRunner.query(`ALTER TABLE \`access_token\` DROP FOREIGN KEY \`FK_4bd9bc00776919370526766eb43\``);
        await queryRunner.query(`DROP INDEX \`IDX_5bc64f65c24f7c06ac892c335d\` ON \`workspaces_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f5b213d4f56597f813e5c4b97\` ON \`workspaces_users\``);
        await queryRunner.query(`DROP TABLE \`workspaces_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_05b29b8ae6507696c6ca11edfb\` ON \`workspace_groups_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_371eafc0f1d04c1a277138fd65\` ON \`workspace_groups_users\``);
        await queryRunner.query(`DROP TABLE \`workspace_groups_users\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`project_user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`workspace\``);
        await queryRunner.query(`DROP TABLE \`workspace_group\``);
        await queryRunner.query(`DROP TABLE \`access_token\``);
    }

}
