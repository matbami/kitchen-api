export class Update21720872886252 {
  name = "Update21720872886252";

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`price\``);
    await queryRunner.query(`ALTER TABLE \`menu\` ADD \`price\` int NOT NULL`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `ALTER TABLE \`menu\` ADD \`price\` varchar(255) NOT NULL`
    );
  }
}
