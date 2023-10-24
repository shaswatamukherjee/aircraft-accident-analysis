import { TestBed } from '@angular/core/testing';
import { NotificationBarComponent } from './notification-bar.component';
import { Component } from '@angular/core';
@Component({
    selector: 'test-host',
    template: `
        <app-notification-bar [title]="errorTitle" [text]="errorText"></app-notification-bar>
    `
})
export class TestHostComponent {
    errorTitle = 'Some Error';
    errorText = 'Text for error';
}

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [TestHostComponent, NotificationBarComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
