import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1587050811769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider')
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true
      }))

      await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        //alem do set null tem o RESTRICT que nao deixa deletar e o CASCADE que deleta tudo
        onUpdate: 'CASCADE'
        // se um id for alterado tudo deve ser alterado, por isso o cascade
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider')

      await queryRunner.dropColumn('appointments', 'provider_id')

      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider',
        type: 'varchar',
      }))
    }

}
