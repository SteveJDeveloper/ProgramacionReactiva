import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private apiUrl: string = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id=";

  constructor(
    private http: HttpClient
  ) { }

  public validateId(id: string): Observable<boolean>{
    return this.http.get<boolean>(this.apiUrl+id);
  }

  public validateName(control: FormControl): ValidationErrors | null{
    let value: string = control.value;
    if(value.includes('Steve') || value.includes('Carolina')){
      return { noOwner: true }
    }
    return null;
  }
}
