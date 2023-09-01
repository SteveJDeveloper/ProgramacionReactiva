import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService } from './services/validation.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public reactiveForm: FormGroup = undefined!;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService
  ){}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void{
    const today = new Date().toISOString().substring(0, 10);
    this.reactiveForm = this.formBuilder.group({
      date: [today],
      id: ['', [Validators.required], [this.validateId.bind(this)]],
      name: ['',[Validators.required, Validators.minLength(7), this.validationService.validateName]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public printReactiveForm(): void{
    console.log(this.reactiveForm);
    console.log(this.reactiveForm.value);
  }

  private validateId(control: AbstractControl): Promise<any> | Observable<any>{
    let promesa = new Promise(
      (resolve, reject)=> {
        setTimeout(()=>{
          this.validationService.validateId(control.value).subscribe({
            next: (res:boolean) => {
              if(res){
                resolve({idTaken: true});
              }else{
                resolve(null)
              }
            }
          })

        },1000)
      }
    );
    return promesa;
  }

  get idValid(){
    return this.reactiveForm.get('id')?.invalid && this.reactiveForm.get('id')?.touched;
  }

  get nameValid(){
    return this.reactiveForm.get('name')?.invalid && this.reactiveForm.get('name')?.touched;
  }

  get emailValid(){
    return this.reactiveForm.get('email')?.invalid && this.reactiveForm.get('email')?.touched;
  }
}
