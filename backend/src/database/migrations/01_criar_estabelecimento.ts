import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('estabelecimento', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('cnpj').notNullable();
        table.string('imagem');
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('estabelecimento');
}