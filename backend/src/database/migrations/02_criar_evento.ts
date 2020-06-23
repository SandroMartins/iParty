import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('evento', table => {
        table.increments('id').primary();
        table.integer('id_estabelecimento')
            .notNullable()
            .references('id')
            .inTable('estabelecimento');
            
        table.string('titulo').notNullable();
        table.string('imagem');
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('data').notNullable();
        table.string('horario_inicio').notNullable();
        table.string('horario_fim').notNullable();
        table.integer('capacidade').notNullable();
        table.decimal('preco');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('evento');
}