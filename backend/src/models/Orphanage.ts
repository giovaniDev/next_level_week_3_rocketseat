import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import Images from './Image';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekend: boolean;

    @OneToMany(() => Images, images => images.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Images[];
}