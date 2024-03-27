import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket | undefined;
  private messageSubject: Subject<string> = new Subject();
  public messages: Observable<string> = this.messageSubject.asObservable();

  constructor() {}

  public connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
      this.sendMessage({ message: 'Hello there!' });
    };

    this.socket.onmessage = (event) => {
      console.log('Message from server ', event.data);
      this.messageSubject.next(event.data);
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket is closed now.', event);
    };
  }

  public sendMessage(data: object): void {
    this.socket!.send(JSON.stringify(data));
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

