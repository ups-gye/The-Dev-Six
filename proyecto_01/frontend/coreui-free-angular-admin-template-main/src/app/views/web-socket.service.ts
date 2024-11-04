import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | undefined;
  private messagesSubject = new Subject<string>();

  constructor() {
    this.connect();
  }

  connect(): void {
    this.socket = new WebSocket('ws://localhost:8080/notifications');

    // Evento de apertura de conexión
    this.socket.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    // Evento de recepción de mensaje
    this.socket.onmessage = (event) => {
      this.messagesSubject.next(event.data);
    };

    // Evento de cierre de conexión
    this.socket.onclose = (event) => {
      console.log('Desconectado del WebSocket');
      // Reconecta solo si la desconexión no fue intencionada
      if (!event.wasClean) {
        console.log('Intentando reconectar...');
        setTimeout(() => this.connect(), 3000); // Reintento de conexión en 3 segundos
      }
    };

    // Evento de error
    this.socket.onerror = (error) => {
      console.error('Error en el WebSocket', error);
      // Opción: Cerrar el socket en caso de error crítico
      this.socket?.close();
    };
  }

  // Metodo para recibir los mensajes como Observable
  getMessages(): Observable<string> {
    return this.messagesSubject.asObservable();
  }

  // Metodo para enviar mensajes al WebSocket
  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('El WebSocket no está abierto. No se puede enviar el mensaje.');
    }
  }

  // Limpieza del Subject al cerrar el servicio o al destruir el componente
  disconnect(): void {
    this.socket?.close();
    this.messagesSubject.complete();
  }
}
