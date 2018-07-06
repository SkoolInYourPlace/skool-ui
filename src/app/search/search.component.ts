import { Component, OnInit } from '@angular/core';
import { SchoolServiceService } from './../services/school-service.service';
import { FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'four', 'five', 'six'];
  filteredOptions: Observable<string[]>;

  constructor(
    private schoolService: SchoolServiceService
    // private router: Router
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  search(term: string): void {
    console.log(`-----------> Searching for ${term}`);
    this.schoolService.getAll().subscribe((data: any[]) => {
      console.log(data);
      data.forEach((schoolData: any) => {
        console.log(schoolData.schoolName);
      });
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
