import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../model/Conversation.model';
import { MessagePerso } from '../model/Message.model';

import { Location } from '@angular/common';

import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/User.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  conversation : Conversation;
  messages : MessagePerso[];
  constructor(private conversationService:ConversationService,private route: ActivatedRoute, private location: Location) { }

 
  ngOnInit() {
    this.getConversation();
  }

  getConversation(): void {
    const profilId1 = this.route.snapshot.params['profilId1'];
    const profilId2 = this.route.snapshot.params['profilId2'];
    this.conversationService.getConversation(profilId1,profilId2)
      .subscribe(conversation => this.conversation = conversation);
  }

//To do test si existeÒ
  add(conversation: Conversation): void {
    this.conversationService.addMessage(conversation)
     .subscribe(() => this.goBack());
 }
 goBack(): void {
   this.location.back();
 }

}
