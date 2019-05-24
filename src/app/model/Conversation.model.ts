import {MessagePerso} from './Message.model';

export class Conversation {
    id: number;
    profilId1:number;
    profilId2:number;
    messages: MessagePerso[];
}