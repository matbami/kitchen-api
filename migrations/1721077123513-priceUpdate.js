
export class PriceUpdate1721077123513 {
    name = 'PriceUpdate1721077123513'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`price\` varchar(255) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`price\` decimal(10,0) NOT NULL`);
    }
}
