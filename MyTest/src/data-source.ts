import "reflect-metadata"
import { DataSource } from "typeorm"
import { Photo } from "./entity/Photo"
import { Author } from "./entity/Author"
import { Album } from "./entity/Album"
import { PhotoMetadata } from "./entity/PhotoMetadata"
import { User } from "./entity/DB1"
import { Photo2 } from "./entity/DB2"
import { Content,Image,Question,Post  } from "./entity/Inheritance"
import { Category } from "./entity/Tree"
import { PhotoMeta } from "./entity/View"
import {PhotoSubscriber} from "./entity/Subscribe";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "jie",
    password: "pwd123",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Photo, PhotoMetadata, Author, Album, Content, Image, Question, Post, Category, PhotoMeta],
    migrations: [],
    subscribers: [PhotoSubscriber],
})

export const DB1 = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "db1",
    password: "db1",
    database: "db1",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

export const DB2 = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "db2",
    password: "db2",
    database: "db2",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
