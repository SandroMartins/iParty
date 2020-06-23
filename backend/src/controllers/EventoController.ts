import { Request, Response } from 'express';
import knex from '../database/connection';

class EventoController {
    async index(request: Request, response: Response) {
        const { cidade, uf } = request.query;
        
        const eventos = await knex('evento')
            .where('cidade', String(cidade))
            .where('uf', String(uf))
            .distinct()
            .select('evento.*');

        const serializedEventos = eventos.map(evento => {
            return {
                ...evento,
                imagem: `http://192.168.15.58:3333/uploads/ea6684d6b4c5-mercado2.jpg`,
            }
        });

        return response.json(serializedEventos);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const evento = await knex('evento').where('id', id).first();

        if (!evento) {
            return response.status(400).json({ message: 'Evento não encontrado.' })
        }

        const estabelecimento = await knex('evento')
            .join('estabelecimento', 'estabelecimento.id', '=', 'evento.id_estabelecimento')
            .where('estabelecimento.id', evento.id_estabelecimento)
            .distinct()
            .select('estabelecimento.nome', 'estabelecimento.email', 'estabelecimento.whatsapp');
            

        const serializedEvento = {
            ...evento,
            imagem: `http://192.168.15.58:3333/uploads/ea6684d6b4c5-mercado2.jpg`,
        }

        return response.json({ evento: serializedEvento, estabelecimento });
    } 

    async create(request: Request, response: Response) {
        const {
            id_estabelecimento,
            titulo,
            cidade,
            uf,
            latitude,
            longitude,
            data,
            horario_inicio,
            horario_fim,
            capacidade,
            preco
        } = request.body;
    
        const trx = await knex.transaction();

        const evento = {
            imagem: 'http://192.168.15.58:3333/uploads/ea6684d6b4c5-mercado2.jpg',
            id_estabelecimento,
            titulo,
            cidade,
            uf,
            latitude,
            longitude,
            data,
            horario_inicio,
            horario_fim,
            capacidade,
            preco
        }
    
        const insertedIds = await trx('evento').insert(evento);
        
        const evento_id = insertedIds[0];
        
        await trx.commit();
    
        return response.json({ 
            id: evento_id,
            ...evento
         });
    
    }

}


export default EventoController;