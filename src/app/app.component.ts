import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MobileSdkMessage } from './mobile-sdk-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  html!: string;
  test:boolean=false;
  @ViewChild('wrapper')wrapper!: ElementRef;
  // ngAfterViewInit(): void {
  //  this.open();
  //  console.log('everything loaded')
  // }
  open(){
    this.wrapper.nativeElement.innerHTML = this.html;
    if(this.wrapper){
       ( document.getElementById(
          'threedsChallengeRedirectForm'
        ) as HTMLFormElement
      ).submit(); 
    }
    else {
      this.test=false;
      console.log('div not loaded yet!')
    }
  }

  @HostListener('window:message', ['$event'])
  onWindowMessage(event: MessageEvent) {
    debugger;
    try {
      console.dir(event);
      console.error("source: "+event.source);
      console.error("origin: "+event.origin)
      // JSON.parse(event.data);
      const message: MobileSdkMessage = event.data as MobileSdkMessage;
      if (this.isValidMessage(message)) {
        this.test=true;
        debugger;
        console.error('Received message from window:', message.html);
        this.html=message.html;
        this.open();
      }
    } catch (error) {
      console.error('Error handling window message:', error);
    }
  }
  isValidMessage(message: any) {
    console.error(message?.html);
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
