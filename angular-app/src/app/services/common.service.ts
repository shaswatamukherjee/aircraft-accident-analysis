import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showError: BehaviorSubject<boolean> = new BehaviorSubject(false);
  errorMessage?: string;
  
  constructor() { }
  
  /**
   * sets the loader attribute to true, called when the loader needs to be shown
   */
  setLoader() {
    this.showLoader.next(true);
  }
  
  /**
   * resets the loader attribute to false, called when the loader needs to be hidden
   */
  resetLoader() {
    this.showLoader.next(false);
  }
  
  /**
   * sets the showError attribute to true and sets the message, called when there is an error
   * @param message: string
   */
  setError(message: string) {
    this.showError.next(true);
    this.errorMessage = message;
  }
  
  /**
   * resets the showError attribute to false, called when the error status needs to be reset
   */
  resetError() {
    this.showError.next(false);
  }
}
