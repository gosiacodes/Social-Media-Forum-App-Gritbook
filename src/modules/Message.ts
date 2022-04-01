import { db } from "./firebaseApp";
import { ref, remove, update } from "firebase/database";

// Message class med constructor
class Message {
    constructor(
        public readonly id: string,
        public readonly username: string,
        public message: string,
        public readonly timestamp: string,
        public readonly userId: string
    ) { }
    public clearChat(): void {
        document.querySelector(`#${this.id}`).remove();
    }
}

export { Message }

