import { Pipe, PipeTransform } from '@angular/core';
import {show} from './show'
@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: show[], args?: string): show[]{
    let filter:string = args ? args.toLocaleLowerCase():null;
        return filter?value.filter(
            (product:show)=>
            {return product.mrating.toString().toLocaleLowerCase().indexOf(filter)!=-1}
        ):value;
  }
}
