import { Component, OnDestroy, AfterContentInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {
  title = 'angular-app';
  selectedYear!: number;
  showLoader: boolean = false;
  showError: boolean = false;
  errorMessage?: string;
  showLoaderSubscription: any;
  showErrorSubscription: any;

  constructor(private readonly cd: ChangeDetectorRef, private readonly commonService: CommonService) {}

  /**
   * initialize the app
   */
  ngOnInit() {
    this.showLoaderSubscription = this.commonService.showLoader.subscribe((value: boolean) => {
      setTimeout(() => {
        if(this.showLoader != value) {
          this.showLoader = value;
        }
      })
    });
    this.showErrorSubscription = this.commonService.showError.subscribe((value: boolean) => {
      if(this.showError != value) {
        this.showError = value;
        this.errorMessage = this.commonService.errorMessage;
      }
    });
  }

  ngAfterContentInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.showLoaderSubscription.unsubscribe();
    this.showErrorSubscription.unsubscribe()
  }
  /**
   * listen to the change in select dropdown for year picker
   * @param event: number
   */
  onYearSelected(event: number) {
    this.selectedYear = event;
  }
}
