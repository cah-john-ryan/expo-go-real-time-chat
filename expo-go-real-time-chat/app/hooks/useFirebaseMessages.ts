import {useEffect, useState} from "react";
import MessageObject from "@/app/objects/MessageObject";
import MessageType from "@/app/objects/MessageType";

import app from "@/firebaseConfig";
import {getDatabase, onValue, ref, set} from "firebase/database";

export default function useFirebaseMessages() {
    const pathName = 'messages';
    // in memory location for these messages
    const [messages, setMessages] = useState<MessageObject[]>([]);

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, pathName);

    const fetchData = () => {
        // In a production application this approach is not adviseable as this is fetching all messages from firebase.
        // You should instead use .limitToLast(#) on the ref() used here at the very least.

        // Listen for changes in the collection
        onValue(collectionRef, (snapshot) => {
            const data = snapshot.val();

            // Check if dataItem exists
            if (data) {
                // Convert the object values into an array
                console.debug(`useFirebaseMessages.fetchData: ${Object.entries(data).length} items being kept in memory`);
                const rawData = Object.values(data).reverse();
                const messages = rawData.map((rawItem) => {
                    return new MessageObject(
                        // @ts-ignore
                        rawItem.who,
                        // @ts-ignore
                        rawItem.messageText,
                        // @ts-ignore
                        rawItem.messageType,
                        // @ts-ignore
                        rawItem.time,
                        // @ts-ignore
                        rawItem.key,
                    );
                })
                setMessages(messages);
            }
        });
    };

    const storeMessage = (userKey: string | null | undefined, newMessageText: string, messageType: MessageType) => {
        if (!userKey) {
            console.error(`Unable to store message for unknown userKey`);
        } else {
            const newMessage = new MessageObject(userKey, newMessageText, messageType);
            console.debug(`useFirebaseMessages.storeMessage:`, newMessage);
            set(ref(database, `${pathName}/${newMessage.key}`), newMessage);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {messages, storeMessage}
}