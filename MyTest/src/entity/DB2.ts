import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ database: "db2" })
export class Photo2 {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string
}