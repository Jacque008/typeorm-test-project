import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, ManyToMany, JoinColumn } from "typeorm"
import { Album } from "./Album"
import { Author } from "./Author"
import { PhotoMetadata } from "./PhotoMetadata"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    name: string

    @Column("text")
    description: string

    @Column()
    filename: string

    @Column()
    views: number

    @Column()
    isPublished: boolean

    @OneToOne(()=>PhotoMetadata, (photoMetadata)=>photoMetadata.photo, {cascade:true})
    metadata: PhotoMetadata

    @ManyToOne(() => Author, (author) => author.photos, {cascade:true})
    author: Author

    @ManyToMany(()=>Album, (album)=>album.photos, {cascade:true})
    albums: Album[]
}