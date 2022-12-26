import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1672017668828 implements MigrationInterface {
    name = 'Initial1672017668828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project_user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`project_id\` varchar(255) NOT NULL, \`project_permission\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`workspace_id\` varchar(255) NOT NULL, \`owner_id\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`workspace_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_group\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`workspace_id\` varchar(255) NOT NULL, \`default_permission\` enum ('read', 'write', 'admin') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`owner_id\` varchar(255) NOT NULL, \`default_group_id\` varchar(255) NULL, UNIQUE INDEX \`REL_a6c7f557a644e3073921b70a69\` (\`default_group_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` varchar(36) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`finished_landing\` tinyint NOT NULL DEFAULT 0, \`default_workspace_id\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`access_token\` (\`created_date\` varchar(255) NOT NULL, \`modified_date\` varchar(255) NOT NULL, \`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_groups_users\` (\`group_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_371eafc0f1d04c1a277138fd65\` (\`group_id\`), INDEX \`IDX_05b29b8ae6507696c6ca11edfb\` (\`user_id\`), PRIMARY KEY (\`group_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project_user\` ADD CONSTRAINT \`FK_2a781b3f2de389d1c6ea41f48f5\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_5cb157e3d3ab8abd16251129dba\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d40afe32d1d771bea7a5f468185\` FOREIGN KEY (\`owner_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_user\` ADD CONSTRAINT \`FK_b312f71c6b1049d0455261f39dc\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_group\` ADD CONSTRAINT \`FK_b093e2ff1aba56135cf1d24ddae\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD CONSTRAINT \`FK_988cf8ee530a5f8a2d56269955b\` FOREIGN KEY (\`owner_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD CONSTRAINT \`FK_a6c7f557a644e3073921b70a690\` FOREIGN KEY (\`default_group_id\`) REFERENCES \`workspace_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_88d8d7f465ce668d0df2e29686b\` FOREIGN KEY (\`default_workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`access_token\` ADD CONSTRAINT \`FK_4bd9bc00776919370526766eb43\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_groups_users\` ADD CONSTRAINT \`FK_371eafc0f1d04c1a277138fd659\` FOREIGN KEY (\`group_id\`) REFERENCES \`workspace_group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`workspace_groups_users\` ADD CONSTRAINT \`FK_05b29b8ae6507696c6ca11edfb4\` FOREIGN KEY (\`user_id\`) REFERENCES \`workspace_user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workspace_groups_users\` DROP FOREIGN KEY \`FK_05b29b8ae6507696c6ca11edfb4\``);
        await queryRunner.query(`ALTER TABLE \`workspace_groups_users\` DROP FOREIGN KEY \`FK_371eafc0f1d04c1a277138fd659\``);
        await queryRunner.query(`ALTER TABLE \`access_token\` DROP FOREIGN KEY \`FK_4bd9bc00776919370526766eb43\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_88d8d7f465ce668d0df2e29686b\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP FOREIGN KEY \`FK_a6c7f557a644e3073921b70a690\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP FOREIGN KEY \`FK_988cf8ee530a5f8a2d56269955b\``);
        await queryRunner.query(`ALTER TABLE \`workspace_group\` DROP FOREIGN KEY \`FK_b093e2ff1aba56135cf1d24ddae\``);
        await queryRunner.query(`ALTER TABLE \`workspace_user\` DROP FOREIGN KEY \`FK_b312f71c6b1049d0455261f39dc\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d40afe32d1d771bea7a5f468185\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_5cb157e3d3ab8abd16251129dba\``);
        await queryRunner.query(`ALTER TABLE \`project_user\` DROP FOREIGN KEY \`FK_2a781b3f2de389d1c6ea41f48f5\``);
        await queryRunner.query(`DROP INDEX \`IDX_05b29b8ae6507696c6ca11edfb\` ON \`workspace_groups_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_371eafc0f1d04c1a277138fd65\` ON \`workspace_groups_users\``);
        await queryRunner.query(`DROP TABLE \`workspace_groups_users\``);
        await queryRunner.query(`DROP TABLE \`access_token\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_a6c7f557a644e3073921b70a69\` ON \`workspace\``);
        await queryRunner.query(`DROP TABLE \`workspace\``);
        await queryRunner.query(`DROP TABLE \`workspace_group\``);
        await queryRunner.query(`DROP TABLE \`workspace_user\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`project_user\``);
    }

}
