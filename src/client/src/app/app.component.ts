import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';

import { Message } from 'primeng/api';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private connection: HubConnection;
  private messages: Message[] = [];

  constructor() { }

  ngOnInit(): void {
    this.connection = new signalR.HubConnectionBuilder().withUrl('https://signalr-demo-dotnetgroup.azurewebsites.net/notifications').build();
    this.connection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(() => console.log('Error while establishing connection :('));

    this.connection.on('BroadcastMessage', (type: string, payload: string) => {
      this.messages.push({ severity: type, summary: payload });
    });
  }
}
