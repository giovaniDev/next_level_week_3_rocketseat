import { Request, Response } from 'express';
import * as Yup from 'yup';

import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';

export default {
    async create(req: Request, res: Response) {

        const { 
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend
        } = req.body;
    
        const orphanagerepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename };
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend: open_on_weekend === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekend: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))

        })

        await schema.validate(data, {
            abortEarly: false
        })
    
        const orphanage = orphanagerepository.create(data)
    
        await orphanagerepository.save(orphanage)
    
        return res.status(201).json(orphanage)
    },

    async index(req: Request, res: Response) {
        const orphanagerepository = getRepository(Orphanage);

        const orphanages = await orphanagerepository.find({
            relations: ['images']
        });

        return res.json(OrphanageView.renderMany(orphanages))
    },

    async show(req: Request, res: Response) {
        try {
            const orphanagerepository = getRepository(Orphanage);

            const orphanage = await orphanagerepository.findOneOrFail(req.params.id, {
                relations: ['images']
            });
    
            return res.json(OrphanageView.render(orphanage))
        } catch (error) {
            res.status(401).json(error)
        }
    }
}