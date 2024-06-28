export class DbSchema1719584654215 {
  name = "DbSchema1719584654215";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`businessName\` varchar(255) NULL, \`address\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('customer', 'vendor') NOT NULL DEFAULT 'customer', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`menu\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`menu\` ADD CONSTRAINT \`FK_4567d47472c13f6d5145c0443a2\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`menu\` DROP FOREIGN KEY \`FK_4567d47472c13f6d5145c0443a2\``
    );
    await queryRunner.query(`DROP TABLE \`menu\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
