
export class SchemaUpdate1719405413932 {
    name = 'SchemaUpdate1719405413932'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`vendors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`vendorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8536b8b85c06969f84f0c098b0\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`FK_abca879e2dc163a3a55de778224\` FOREIGN KEY (\`vendorId\`) REFERENCES \`vendors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`FK_abca879e2dc163a3a55de778224\``);
        await queryRunner.query(`DROP INDEX \`IDX_8536b8b85c06969f84f0c098b0\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP TABLE \`menu\``);
        await queryRunner.query(`DROP TABLE \`vendors\``);
    }
}
