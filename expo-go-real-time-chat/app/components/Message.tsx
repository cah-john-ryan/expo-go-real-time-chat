import MessageFromSomeoneElse from "@/app/components/message/MessageFromSomeoneElse";
import MessageFromSelf from "@/app/components/message/MessageFromSelf";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";

type MessageHandlerProps = {
    userDataForSelf: UserData;
    message: MessageObject;
    userDataForMessage: UserData | undefined;
}
export default function Message({userDataForSelf, message, userDataForMessage}: Readonly<MessageHandlerProps>) {
    if (message.who === userDataForSelf?.key) {
        return (
            <MessageFromSelf message={message} />
        );
    } else {
        return (
            <MessageFromSomeoneElse
                message={message}
                userDataForMessage={userDataForMessage}
            />
        );
    }
}