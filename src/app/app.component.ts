import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MobileSdkMessage } from './mobile-sdk-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  html!: string;
  @ViewChild('wrapper')wrapper!: ElementRef;
  ngAfterViewInit(): void {
   this.open();
  }
  open(){
    this.wrapper.nativeElement.innerHTML = this.html;
    (
      document.getElementById(
        'threedsChallengeRedirectForm'
      ) as HTMLFormElement
    ).submit();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @HostListener('window:message', ['$event'])
  onWindowMessage(event: MessageEvent) {
    debugger;
    try {
      console.dir(event);
      // JSON.parse(event.data);
      const message: MobileSdkMessage = event.data as MobileSdkMessage;
      if (this.isValidMessage(message)) {
        debugger;
        console.log('Received message from window:', message.html);
        (document.getElementById('threedsChallengeRedirectForm') as HTMLFormElement).submit();
        this.html=message.html;
        this.open();
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
