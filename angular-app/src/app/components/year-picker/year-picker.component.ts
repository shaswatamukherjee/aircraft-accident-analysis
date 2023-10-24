// year-picker.component.ts
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html'
})
export class YearPickerComponent implements OnInit {
  @Output() selectedYear = new EventEmitter<number>();
  selectedValue!: number;
  years!: number[];

  constructor(private readonly queryService: QueryService, private readonly commonService: CommonService) {}

  ngOnInit() {
    this.queryService.getYears()
    .subscribe((response: number[]) => {
      this.years = response;
      this.selectedValue = response[0];
      this.onSelectYear(this.selectedValue);
    }, (error) => {
      this.commonService.setError(error.message);
    })
  }

  /**
   * emit the selected year from the picker
   * @param event: number
   */
  onSelectYear(event: number) {
    this.selectedValue = event;
    this.selectedYear.emit(event);
  }
}