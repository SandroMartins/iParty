import { Request, Response } from 'express';
import knex from '../database/connection';

class EstabelecimentoController {
    async index(request: Request, response: Response) {
        const estabelecimentos = await knex('estabelecimento').select('*');

        const serializedItems = estabelecimentos.map(estabelecimento => {
            return {
                id: estabelecimento.id,
                nome: estabelecimento.nome,
                cnpj: estabelecimento.cnpj,
                imagem: `http://localhost:3333/uploads/${estabelecimento.imagem}`,
                email: estabelecimento.email,
                whatsapp: estabelecimento.whatsapp,
            }
        });
    
        return response.json(serializedItems); 
    }


    async create(request: Request, response: Response) {
        const {
            nome,
            cnpj,
            email,
            whatsapp,
        } = request.body;
    
        const trx = await knex.transaction();

        const estabelecimento = {
            imagem: request.file.filename,
            nome,
            cnpj,
            email,
            whatsapp,
        }
    
        await trx('estabelecimento').insert(estabelecimento);

        await trx.commit();
    
        return response.json({ 
            ...estabelecimento
         });
    
    }
}


export default EstabelecimentoController;