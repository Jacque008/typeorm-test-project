import "reflect-metadata"
import { AppDataSource,DB1,DB2 } from "../src/data-source"
import { Author } from "../src/entity/Author"
import { Album } from "../src/entity/Album"
import { Photo } from "../src/entity/Photo"
import { PhotoMetadata } from "../src/entity/PhotoMetadata"
import { User } from "../src/entity/DB1"
import { Photo2 } from "../src/entity/DB2"
import { Content,Image,Question,Post } from "../src/entity/Inheritance"
import { Category } from "../src/entity/Tree"
import { PhotoMeta } from "../src/entity/View"
import { CLIENT_RENEG_LIMIT } from "tls"

1. created database
    const author1 = new Author()
    author1.name = "Apolo"

    const author2 = new Author()
    author2.name = "Jie"

    const album1 = new Album()
    album1.name = "Me"

    const album2 = new Album()
    album2.name = "Animal"

    const metadata1 = new PhotoMetadata()
    metadata1.height = 320
    metadata1.width = 280
    metadata1.compressed = true
    metadata1.comment = "cat"
    metadata1.orientation = "cat"

    const metadata2 = new PhotoMetadata()
    metadata2.height = 640
    metadata2.width = 480
    metadata2.compressed = true
    metadata2.comment = "dog"
    metadata2.orientation = "dog"

    const metadata3 = new PhotoMetadata()
    metadata3.height = 800
    metadata3.width = 600
    metadata3.compressed = true
    metadata3.comment = "bird"
    metadata3.orientation = "bird"

    const metadata4 = new PhotoMetadata()
    metadata4.height = 1072
    metadata4.width = 960
    metadata4.compressed = true
    metadata4.comment = "bear"
    metadata4.orientation = "bear"

    const metadata5 = new PhotoMetadata()
    metadata5.height = 1072
    metadata5.width = 960
    metadata5.compressed = true
    metadata5.comment = "tiger"
    metadata5.orientation = "tiger"  

    const metadata6 = new PhotoMetadata()
    metadata6.height = 1072
    metadata6.width = 960
    metadata6.compressed = true
    metadata6.comment = "lion"
    metadata6.orientation = "lion"

    const photo1 = new Photo()
    photo1.name = "Me and cat"
    photo1.description = "cat"
    photo1.filename = "cat.jpg"
    photo1.views = 1
    photo1.isPublished = true
    photo1.metadata = metadata1
    photo1.author = author1
    photo1.albums = [album1]

    await AppDataSource.manager.save(photo1)

    const photo2 = new Photo()
    photo2.name = "Me and dog"
    photo2.description = "dog"
    photo2.filename = "dog.jpg"
    photo2.views = 2
    photo2.isPublished = true
    photo2.metadata = metadata2
    photo2.author = author1
    photo2.albums = [album2]

    await AppDataSource.manager.save(photo2)

    const photo3 = new Photo()
    photo3.name = "Me and bird"
    photo3.description = "bird"
    photo3.filename = "bird.jpg"
    photo3.views = 3
    photo3.isPublished = true
    photo3.metadata = metadata3
    photo3.author = author1
    photo3.albums = [album1, album2]

    await AppDataSource.manager.save(photo3)

    const photo4 = new Photo()
    photo4.name = "Me and bear"
    photo4.description = "bear"
    photo4.filename = "bear.jpg"
    photo4.views = 4
    photo4.isPublished = true
    photo4.metadata = metadata4
    photo4.author = author2
    photo4.albums = [album1]

    await AppDataSource.manager.save(photo4)

    const photo5 = new Photo()
    photo5.name = "Me and tiger"
    photo5.description = "tiger"
    photo5.filename = "tiger.jpg"
    photo5.views = 5
    photo5.isPublished = true
    photo5.metadata = metadata5
    photo5.author = author2
    photo5.albums = [album2]

    await AppDataSource.manager.save(photo5)

    const photo6 = new Photo()
    photo6.name = "Me and lion"
    photo6.description = "lion"
    photo6.filename = "lion.jpg"
    photo6.views = 6
    photo6.isPublished = true
    photo6.metadata = metadata6
    photo6.author = author2
    photo6.albums = [album1, album2]

    await AppDataSource.manager.save(photo6)


2. data-source:
    entities: ["entity/*.ts"]

3. find
    const savedPhotos = await photoRepository.find()
    console.log("All photos from the db: ", savedPhotos)

    const photoRepository = AppDataSource.getRepository(Photo)

    const onePhoto = await photoRepository.findOneBy({id:1})    
    onePhoto.name = "Hello"
    await photoRepository.remove(onePhoto)

    const a = await photoRepository.findBy({id:1})
    console.log(a)

    const [photos, count] = await photoRepository.findAndCountBy({id:1})    
    console.log(photos, count)

    const authorRepository = await AppDataSource.getRepository(Author)
    const allPhotos = await photoRepository.find({
        relations: {
            author: true,
        },
    })

    console.log("allPhotos:", photos)

    const loadedPhoto = await AppDataSource.getRepository(Photo).findOne({
        where: {
            description: "ducks",
        },
        relations: {
            albums: true,
        },
    })

4. join
    const photos = await AppDataSource.getRepository(Author)
        .createQueryBuilder("author")
        .innerJoinAndSelect("author.photos", "photos")
        .getMany()

    const photos = await AppDataSource.getRepository(Photo)
        .createQueryBuilder("photo1") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .innerJoinAndSelect("photo1.metadata", "metadata")
        .leftJoinAndSelect("photo1.albums", "album")
        .where("photo1.isPublished = true")
        .andWhere("(photo1.filename = :photoName OR photo1.filename = :bearName)")
        .orderBy("photo1.id", "DESC")
        .setParameters({ photoName: "tigers.jpg", bearName: "duck.jpg" })
        .getMany() 

5. update
    const photoRepository3 = AppDataSource.getRepository(Photo)
    .createQueryBuilder("photo")
    .where("photo.id in (3,6)")
    .update({albums: [album1,album2]})
    await photoRepository3.execute();

6.  single interitance  
    const content = new Content()
    content.title = "test content"
    content.description = "single interitance"
    
    const image = new Image()
    image.title = "test image"; // set the title property for the image
    image.description = "an image"; 
    image.size = "600*800"

    const question = new Question()
    question.title = "test question"; // set the title property for the image
    question.description = "an question"; 
    question.answersCount = 10

    const post = new Post()
    post.title = "test post"; // set the title property for the image
    post.description = "an post"; 
    post.viewCount = 20

    await AppDataSource.manager.save(content)
    await AppDataSource.manager.save(image)
    await AppDataSource.manager.save(question)
    await AppDataSource.manager.save(post)

7. tree
    const a1 = new Category()
    a1.name = "a1"
    await AppDataSource.manager.save(a1)

    const a11 = new Category()
    a11.name = "a11"
    a11.parent = a1
    await AppDataSource.manager.save(a11)

    const a12 = new Category()
    a12.name = "a12"
    a12.parent = a1
    await AppDataSource.manager.save(a12)

    const a111 = new Category()
    a111.name = "a111"
    a111.parent = a11
    await AppDataSource.manager.save(a111)

    const a112 = new Category()
    a112.name = "a112"
    a112.parent = a11
    await AppDataSource.manager.save(a112)

    const trees = await dataSource.manager.getTreeRepository(Category).findTrees()

    const repository = await AppDataSource.manager.getTreeRepository(Category)

    const parentCategory = await repository.findRoots()

    const children = await repository
    .createDescendantsQueryBuilder(
        "category",
        "categoryClosure",
        a1
    )
    .andWhere("category.name = 'a111'")
    .getMany()

    const childrenCount = await repository.findAncestors(a112)

    const parentCategory = await repository.findRoots()

    const children = await repository
    .createDescendantsQueryBuilder(
        "category",
        "categoryClosure",
        a1
    )
    .andWhere("category.name = 'a111'")
    .getMany()

    const childrenCount = await repository.findAncestors(a112)

    const parents = await repository
    .createAncestorsQueryBuilder("category", "categoryClosure", a111)
    .andWhere("category.name = 'a11'")
    .getMany()

8. leftJoinAndMapOne: 将一个实体的属性映射到另一个关联实体的一条记录
    const na = await AppDataSource    
    .createQueryBuilder(Photo,"photo")
    .leftJoinAndMapOne(
        "photo", 字符串，//表示要映射的属性名。
        "photo.metadata",//字符串或实体类，表示关联实体的名称或类型。
        "photoMetadata",//字符串，表示关联实体在 SQL 查询中使用的别名
        "photoMetadata.photoId = photo.id") // 字符串，表示关联实体与当前实体之间的关联条件。               
    .where("photo.id = :id",{id:"3"})
    .getOne()

9. 与没有关联的entity联合查询
    const na = await AppDataSource    
    .createQueryBuilder(Photo,"photo")
    .leftJoin(Category, "category", "category.id = photo.id")                
    .select(["photo.filename","category.name"])
    .getRawMany()

10. getQuery() and getSql() 
    getQuery() returns the generated query string with placeholders for parameters, while getSql() returns the generated SQL query string with parameter values included.

11. .getParameters() method is used to extract the parameters of a query builder instance.

    const queryBuilder = connection
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.firstName = :firstName", { firstName: "John" });

    const parameters = queryBuilder.getParameters(); 
    // returns [{ firstName: "John" }]

12. subqueries
    const na = await AppDataSource
    .createQueryBuilder()
    .select()
    .from((subQuery) => {
        return subQuery
            .select("photo.filename", "name")
            .from(Photo,"photo")
            .where("photo.id = :id1", {id1: 4})
            .orWhere("photo.id = :id2", {id2: 3})
    }, "photo")
    .getRawMany()
//------------------------------------------------
    const userQb = await AppDataSource
    .createQueryBuilder(Photo,"photo")
    .select("photo", "photo") //<--- column defined here
    .where("photo.id = :id1", {id1:3})
    .orWhere("photo.id = :id2", {id2:4})

    const na = await AppDataSource
    .createQueryBuilder()
    .select()//<--- can only select from above column 
    .from("(" + userQb.getQuery() + ")", "photo")
    .setParameters(userQb.getParameters())
    .getRawMany()

13. insert
    await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(Photo)
    .values({
        name: "haha",
        description: "weee!",
        filename: "cat.jpg",
        views:1,
        isPublished: true,
        id: 1
    })
    .orUpdate(
        ["name", "description", "filename", "views", "isPublished"],
        ["id"],
        {
            skipUpdateIfNoValuesChanged: true,
        }
    )
    .execute()

14. update
    await AppDataSource
    .createQueryBuilder()
    .update(Photo)
    .set({
        name: "cat",
        description: "cat",
        filename: "cat.jpg",
        views:1,
        isPublished: true,
        author:1,
        id: 1
    })
    .where("id = :id", { id: 1 })
    .execute()

15. Working with Relations
    photo.albums = await AppDataSource
    .createQueryBuilder()
    .relation(Photo, "albums")
    .of(photo) // you can use just photo id as well
    .loadMany()

    photo.author = await AppDataSource
    .createQueryBuilder()
    .relation(Photo, "author")
    .of(photo) // you can use just photo id as well
    .loadOne()

16. migrations
    1. set data source options properly
    "migrations": [/*...*/] //- list of migrations need to be loaded by TypeORM

    2. in CLI
    typeorm migration:create ./path-to-migrations-dir/PostRefactoring

    3. add the migration sql into the file "PostRefactoring"
    import { MigrationInterface, QueryRunner } from "typeorm"

    export class PostRefactoringTIMESTAMP implements MigrationInterface {
        async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(
                `ALTER TABLE "post" RENAME COLUMN "title" TO "name"`,
            )
        }

        async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(
                `ALTER TABLE "post" RENAME COLUMN "name" TO "title"`,
            ) // reverts things made in "up" method
        }
    }

    4. Running migrations
    typeorm migration:run -- -d path-to-datasource-config (for only .js)

    npx typeorm-ts-node-commonjs migration:run -- -d path-to-datasource-config(for .ts)

    for EMS project

    npx typeorm-ts-node-esm migration:run -- -d path-to-datasource-config

    npx typeorm-ts-node-esm migration:generate ./src/migrations/update-post-table -d ./src/data-source.ts

    5. revert the changes
    typeorm migration:revert -- -d path-to-datasource-config

    6. Faking Migrations and Rollbacks
    typeorm migration:run --fake
    typeorm migration:revert --fake

    7. Generating migrations
    typeorm migration:generate -n PostRefactoring
    -n (for --name):specify the name of the migration that you want to generate.
    -p (for --pretty): apply multi-line formatting to your generated migration queries
    -o (--outputJs): output your migrations as Javascript files

    8. DataSource option
    typeorm -d <your-data-source-path> migration:{run|revert} //run/revert/generate/show your migrations

    9. Timestamp option
    typeorm -t <specific-timestamp> migration:{create|generate} //specify a timestamp for the migration name

    
