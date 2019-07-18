import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { MessageDialog } from '../../shared/message_helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {

  resetting: boolean;
  userForm: FormGroup;
  params: any;
  title = 'Reset User Password';
  @BlockUI() blockForm: NgBlockUI;
  unsubscribe$ = new Subject<void>()

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      confirmPassword: new FormControl('', Validators.required)
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  checkPasswords(formGroup: FormGroup) {
    if (!formGroup.controls) { return null; }
    return formGroup.controls['password'].value === formGroup.controls['confirmPassword'].value ? null : { passwordMismatch: true }
  }

  reset() {
    console.log(12)
    this.params = this.userForm.getRawValue();
    this.blockForm.start('Resetting...');
    this.resetting = true;
    this.userService.reset(this.params)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res) => {
      this.resetting = false;
      this.blockForm.stop();
      if (res.success) {
        this.userForm.reset();
      }
    }, err => {
      this.blockForm.stop();
      console.log('Error -> ' + err.message);
    });
  }
}
