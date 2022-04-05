import { displayMessages } from "./displayHandler";
import { editAndUpdateMessage, deleteMessageFromDatabase } from "./eventListenersMess";

// Message class with constructor
class Message {
    constructor(
        public readonly id: string,
        public readonly username: string,
        public message: string,
        public readonly timestamp: string,
        public readonly userId: string
    ) { }
    // Function to remove messages from DOM
    public clearChat():void {
        document.querySelector(`#${this.id}`).remove();
    }
    // Function to display messages in DOM
    public displayChat():void {
          displayMessages(this);
    }
    // Function to delete own message 
    public deleteMessage():void {
        deleteMessageFromDatabase(this);
    }
    // Function to edit own message
    public editMessage(messageEl:HTMLParagraphElement):void {
        editAndUpdateMessage(this, messageEl);
    }
}

export { Message }

