import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: any): number {
    let birthDate = new Date(value);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    // Adjust age if the birthday has not occurred yet this year
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
