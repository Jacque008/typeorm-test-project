import "reflect-metadata"
import { AppDataSource,DB1,DB2 } from "./data-source"
import { Author } from "./entity/Author"
import { Album } from "./entity/Album"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoMetadata"
import { User } from "./entity/DB1"
import { Photo2 } from "./entity/DB2"
import { Content,Image,Question,Post } from "./entity/Inheritance"
import { Category } from "./entity/Tree"
import { PhotoMeta } from "./entity/View"
import { In } from "typeorm"


AppDataSource.initialize().then(async () => {

    const photo10 = new Photo()
    photo10.name = "Me and fish"
    photo10.description = "fish"
    photo10.filename = "fish.jpg"
    photo10.views = 10
    photo10.isPublished = true

    await AppDataSource.manager.save(photo10)

    // console.log("Inserted the photo.albums", photo.albums)
    // console.log("Inserted the photo.author", photo.author)

}).catch(error => console.log(error))


