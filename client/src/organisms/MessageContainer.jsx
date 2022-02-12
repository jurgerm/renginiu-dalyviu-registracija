import { useMessagesContext } from "../hooks/MessagesContext";
import { Block, Notification, Button } from "react-bulma-components"
export const MessageContainer = () => {

  const { message, removeMessage } = useMessagesContext();
  

  const closeMessage = () => {
    removeMessage();
  };

  return (message != null) ? (
    <Block>
      <Notification>
        {message}
        <Button remove onClick={closeMessage} />
      </Notification>
    </Block>
  ) : null;
}
