import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import EstabelecimentoController from './controllers/EstabelecimentoController';
import EventoController from './controllers/EventoController';

const routes = express.Router();
const upload = multer(multerConfig);

const estabelecimentoController = new EstabelecimentoController();
const eventoController = new EventoController();

routes.get('/estabelecimentos', estabelecimentoController.index);
routes.post('/estabelecimentos', upload.single('imagem'), estabelecimentoController.create);
routes.get('/eventos', eventoController.index);
routes.get('/eventos/:id', eventoController.show);

routes.post('/eventos', upload.single('imagem'), eventoController.create);


export default routes;