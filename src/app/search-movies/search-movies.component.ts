import { Component, OnInit, NgModule } from '@angular/core';
import { DataStruct } from '../DataStruct';
import { AppService } from '../app.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { show } from '../show';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css']
})
export class SearchMoviesComponent implements OnInit {

  nameFilter:string="";
  ratingFilter:string="";

  public shows: show[] = [];

  searchForm: FormGroup;

  category = "";
  mcategoryrequired: string;
  mcategory: FormControl;


  public datalist: DataStruct[] = [];
  constructor(private user: AppService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.user.getData().subscribe(data => this.datalist = data);
  }

  createFormControls() {
    this.mcategory = new FormControl('', Validators.required);
  }

  createForm() {
    this.searchForm = new FormGroup({
      mcategory: this.mcategory,
    })
  }
  temp:number=0;
  
  onSubmit(): void {
    this.getData();

  }

  getData() {
    if(this.mcategory.touched && this.mcategory.value==""){
      this.temp=0;
        this.mcategoryrequired="Select Genre!!!";
    }
    this.temp=this.temp+1;
    this.shows.splice(0, this.shows.length)
    for (let i of this.datalist) {
      if (i.mcategory == this.mcategory.value) {
        this.shows.push(i);
      }
    }
  }

}
