import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseCustom',
  standalone: true
})
export class TitleCaseCustomPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
  }
}
