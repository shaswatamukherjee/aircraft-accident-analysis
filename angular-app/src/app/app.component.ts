import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  selectedYear!: number;
  showLoader: boolean = false;
  showError: boolean = false;
  errorMessage?: string;

  constructor(private readonly commonService: CommonService) {}

  /**
   * initialize the app
   */
  ngOnInit() {
    this.commonService.showLoader.subscribe((value: boolean) => {
      this.showLoader = value;
    });
    this.commonService.showError.subscribe((value: boolean) => {
      this.showError = value;
      this.errorMessage = this.commonService.errorMessage;
    });
  }

  /**
   * listen to the change in select dropdown for year picker
   * @param event: number
   */
  onYearSelected(event: number) {
    this.selectedYear = event;
  }
}
