
export class Update31721076501183 {
    name = 'Update31721076501183'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`price\` decimal(12,2) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`price\` int NOT NULL`);
    }
}
