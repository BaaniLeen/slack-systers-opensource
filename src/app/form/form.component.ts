import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { CommonService } from '../common.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(private newService: CommonService, ) { }
  Repdata;
  valbutton = 'Save';


  ngOnInit() {
    this.newService.GetUser().subscribe(data => this.Repdata = data);
  }

  onSave = function (user, isValid: boolean) {
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
        alert(data.data);

        this.ngOnInit();
      }
        , error => this.errorMessage = error);

  };
  edit = function (kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.address = kk.address;
    this.valbutton = 'Update';
  };

}
