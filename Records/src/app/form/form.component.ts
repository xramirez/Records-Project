import { Component, OnInit } from '@angular/core';
// import { getHeapStatistics } from 'v8';
import { Submission } from './Submission';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  genres: string[] = ['Action', 'Adventure', 'RPG', 'Arcade', 'Horror', 'Sports', 'Strategy'];
  submissions: Submission[] = [];
  submission: Submission = new Submission('', '', '', '', '', false);
  formVals: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(isValid: boolean | null) {
    if (isValid) {
      let newSubmission = { ...this.submission };
      this.formVals = JSON.stringify(this.submission);
      this.submissions.push(newSubmission)
      //console.log(this.submissions);
    } else {
      this.formVals = 'Invalid Entry'
    }
  }

  statistics(): string {
    return `
    Currently reading from ${this.submissions.length} Submission${this.submissions.length == 1 ? '' : 's'}:`
  }

  topGenre() {
    if (this.submissions.length > 0) {
      //console.log('new iteration');
      //console.log("heyo");
      let sortedSubmissions = this.submissions.sort((a, b) => (a.favGenre > b.favGenre) ? 1 : -1)
      let maxCount = 0;
      let maxGenre = "";
      let tempCount = 0;
      let tempGenre = sortedSubmissions[0].favGenre;
      for (let i = 0; i < sortedSubmissions.length; i++) {
        //console.log(sortedSubmissions[i].favGenre)
        if (sortedSubmissions[i].favGenre == tempGenre) {
          tempCount++;
          if (tempCount > maxCount) {
            //console.log(tempCount);
            maxCount = tempCount;
            maxGenre = sortedSubmissions[i].favGenre
          }
        }
        else if(sortedSubmissions[i].favGenre != tempGenre){
          tempGenre = sortedSubmissions[i].favGenre
          tempCount = 1;
        }
      }
      return `Top Genre for all audiences: ${maxGenre}`
    }
    return "";
  }

  topAdultGenre() {
    if (this.submissions.length > 0) {
      //console.log("heyo");
      let sortedSubmissions = this.submissions.sort((a, b) => (a.favGenre > b.favGenre) ? 1 : -1)
      let maxCount = 0;
      let maxGenre = "";
      let tempCount = 0;
      let tempGenre = "";
      for (let i = 0; i < sortedSubmissions.length; i++) {
        if (sortedSubmissions[i].favGenre == tempGenre && sortedSubmissions[i].over18) {
          tempCount++;
          if (tempCount > maxCount) {
            maxCount = tempCount;
            maxGenre = sortedSubmissions[i].favGenre
          }
        }
        else if(sortedSubmissions[i].favGenre != tempGenre && sortedSubmissions[i].over18){
          tempGenre = sortedSubmissions[i].favGenre
          tempCount = 1;
          if(maxCount == 0)
          {
            maxCount = 1;
            maxGenre = sortedSubmissions[i].favGenre
          }
        }
      }
      return `Top Genre for ages 18 and over: ${maxGenre}`
    }
    return "";
  }

  topChildGenre() {
    if (this.submissions.length > 0) {
      //console.log("heyo");
      let sortedSubmissions = this.submissions.sort((a, b) => (a.favGenre > b.favGenre) ? 1 : -1)
      let maxCount = 0;
      let maxGenre = "";
      let tempCount = 0;
      let tempGenre = "";
      for (let i = 0; i < sortedSubmissions.length; i++) {
        if (sortedSubmissions[i].favGenre == tempGenre && !sortedSubmissions[i].over18) {
          tempCount++;
          if (tempCount > maxCount) {
            maxCount = tempCount;
            maxGenre = sortedSubmissions[i].favGenre
          }
        }
        else if(sortedSubmissions[i].favGenre != tempGenre && !sortedSubmissions[i].over18){
          tempGenre = sortedSubmissions[i].favGenre
          tempCount = 1;
          if(maxCount == 0)
          {
            maxCount = 1;
            maxGenre = sortedSubmissions[i].favGenre
          }
        }
      }
      return `Top Genre for ages under 18: ${maxGenre}`
    }
    return "";
  }
}
