import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1677654321000 implements MigrationInterface {
  name = 'InitialSchema1677654321000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // This migration is written for SQLite. For PostgreSQL, you'd use SERIAL for auto-incrementing IDs.
    await queryRunner.query(
      `CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reviewerName" varchar NOT NULL, "rating" int NOT NULL, "content" text NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "FK_213aed3a763aaaa468a716c98ab" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f056d2537f143d3b76a0846666" ON "review" ("bookId")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_f056d2537f143d3b76a0846666"`);
    await queryRunner.query(`DROP TABLE "review"`);
    await queryRunner.query(`DROP TABLE "book"`);
  }
}