import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
})
export class WebsocketComponent implements OnInit, OnDestroy {
  responseMessage: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.connect('wss://ws.postman-echo.com/raw');

    this.subscription.add(
      this.websocketService.messages.subscribe((msg) => {
        console.log('Received message: ', msg);
        this.responseMessage = msg;
      })
    );
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.subscription.unsubscribe();
  }
}
