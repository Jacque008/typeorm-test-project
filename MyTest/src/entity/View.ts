import { ViewEntity, ViewColumn } from "typeorm"
import { DataSource } from "typeorm"
import { PhotoMetadata } from "./PhotoMetadata"
import { Photo } from "./Photo"

@ViewEntity({
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select("photo.id", "id")
            .addSelect("photo.name", "name")
            .addSelect("metadata.comment", "comment")
            .from(Photo, "photo")
            .leftJoin(PhotoMetadata, "metadata", "photo.id = metadata.photoId"),
})
export class PhotoMeta {
    @ViewColumn()
    id: number

    @ViewColumn()
    name: string

    @ViewColumn()
    comment: string
}