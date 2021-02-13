import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    items: any[],
    field: string,
    value: string,
    userTable: boolean = false
  ): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    if (userTable) {
      return items.filter(
        (singleItem) =>
          singleItem.name.toLowerCase().includes(value.toLowerCase()) ||
          singleItem.company.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    return items.filter((singleItem) =>
      singleItem[field].toLowerCase().includes(value.toLowerCase())
    );
  }
}
