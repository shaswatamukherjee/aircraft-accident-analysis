import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-notification-bar',
    templateUrl: './notification-bar.component.html'
})
export class NotificationBarComponent {
    @Input() title: string = 'Error';
    @Input() text?: string = 'There is some fault in the application';
}

  