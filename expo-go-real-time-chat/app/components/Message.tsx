import MessageFromSomeoneElse from "@/app/components/message/MessageFromSomeoneElse";
import MessageFromSelf from "@/app/components/message/MessageFromSelf";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";
import MessageType from "@/app/objects/MessageType";
import ImageFromSelf from "@/app/components/message/ImageFromSelf";
import ImageFromSomeoneElse from "@/app/components/message/ImageFromSomeoneElse";

type MessageHandlerProps = {
    userDataForSelf: UserData;
    message: MessageObject;
    userDataForMessage: UserData | undefined;
}
export default function Message({userDataForSelf, message, userDataForMessage}: Readonly<MessageHandlerProps>) {
    if (message.who === userDataForSelf.key && message.messageType === MessageType.Text) {
        return (
            <MessageFromSelf message={message} />
        );
    } 
    if (message.who === userDataForSelf.key && message.messageType === MessageType.Image) {
        return (
            <ImageFromSelf message={message} />
        );
    }
    if (message.who !== userDataForSelf.key && message.messageType === MessageType.Text) {
        return (
            <MessageFromSomeoneElse
                message={message}
                userDataForMessage={userDataForMessage}
            />
        );
    } 
    if (message.who !== userDataForSelf.key && message.messageType === MessageType.Image) {
        return (
            <ImageFromSomeoneElse
                message={message}
                userDataForMessage={userDataForMessage}
            />
        );
    } 
}