import { Component, HostListener } from '@angular/core';
import { MobileSdkMessage } from './mobile-sdk-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('window:message', ['$event'])
  onWindowMessage(event: MessageEvent) {
    debugger;
    try {
      console.dir(event);
      JSON.parse(event.data);
      const message: MobileSdkMessage = event.data as MobileSdkMessage;
      if (this.isValidMessage(message)) {
        debugger;
        console.log('Received message from window:', message.html);
      }
    } catch (error) {
      console.error('Error handling window message:', error);
    }
  }
  isValidMessage(message: any) {
    return (
      typeof message === 'object' &&
      message !== null &&
      'html' in message &&
      typeof message.html === 'string'
      // Add additional checks for other properties if needed
    );
  }
  title = 'jsChannel';
  clicked(){
    window.postMessage({html:"test"});
  }
}
