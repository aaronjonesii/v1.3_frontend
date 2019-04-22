import { Component, Input, OnInit } from '@angular/core';
import { STATUSES, Tasks } from '../../../../../shared/models/tasks';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'anon-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.scss']
})
export class TaskColumnComponent implements OnInit {

  @Input() tasks: any;
  @Input() status: STATUSES;
  accent_color: string;
  status_color: string;
  title: string;
  title_color: string;

  constructor() { }

  ngOnInit() {

    if (this.status === 'BACKLOG') {
      this.title = 'Backlog';
      // RED
      this.status_color = '';
      this.accent_color = 'danger';
    } else if (this.status === 'UP_NEXT') {
      this.title = 'Up Next';
      // Purple
      this.status_color = '';
      this.accent_color = 'primary';
    } else if (this.status === 'TODO') {
      this.title = 'ToDo';
      // Orange
      this.status_color = '';
      this.accent_color = 'warning';
    } else if (this.status === 'IN_PROGRESS') {
      this.title = 'In Progress';
      // Blue
      this.status_color = '';
      this.accent_color = 'info';
    } else if (this.status === 'COMPLETED') {
      this.title = 'Completed';
      // Green
      this.status_color = '';
      this.accent_color = 'success';
    }
    this.title_color = 'text-' + this.accent_color;

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event);
      // console.log(`Same container! => ${event.previousContainer.data} from ${event.previousContainer} is being moved to ${event.container}, the current index is ${event.currentIndex}`);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(`${event.previousContainer.data} from ${event.previousContainer} is being moved to ${event.container}, the current index is ${event.currentIndex}`);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
