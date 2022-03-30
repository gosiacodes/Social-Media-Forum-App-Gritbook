import { db } from "./firebaseApp";
import { ref, remove, update } from "firebase/database";

//posts class med constructor
class Message {
    constructor(
        public readonly id: string,
        public readonly username: string,
        private readonly timestamp: string,
        public message: string
    ) { }
    public clearChat(): void {
        document.querySelector(`#${this.id}`).remove();
    }
}

