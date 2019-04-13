import { Pipe, PipeTransform } from '@angular/core';
import {STATUSES, Task, Tasks} from '../models/tasks';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(tasks: Tasks[], status: STATUSES) {
    return tasks.filter(task => task.fields.status === status );
  }

}
