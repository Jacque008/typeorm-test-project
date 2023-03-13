import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { Photo } from "./Photo"

@EventSubscriber()
export class PhotoSubscriber implements EntitySubscriberInterface<Photo> {
    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return Photo
    }

    /**
     * Called before post insertion.
     */
    beforeInsert(event: InsertEvent<Photo>) {
        console.log(`BEFORE POST INSERTED: `, event.entity)
    }
}