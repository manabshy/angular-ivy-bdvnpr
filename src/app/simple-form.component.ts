import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from './title.model';
import { TitleService } from './title.service';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent implements OnInit {
  titles: Title[];
  form: FormGroup;

  constructor(private titleService: TitleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getTitles();
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      title: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      acceptTerms: new FormControl(''),
    });
  }

  getTitles() {
    this.titleService.getTitles().subscribe((response) => {
      this.titles = response.filter((item) => item.name !== '!');
      this.titles.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
