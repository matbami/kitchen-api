
export class Update51721077002108 {
    name = 'Update51721077002108'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`price\` decimal NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`price\` varchar(255) NOT NULL`);
    }
}
