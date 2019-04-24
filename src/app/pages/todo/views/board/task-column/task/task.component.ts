import { Component, Input, OnInit } from '@angular/core';
import { Task, Tasks } from '../../../../../../shared/models/tasks';
import { EditTaskComponent } from '../../../../edittask/edittask.component';
import { XorComponent } from '../../../../xor/xor.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'anon-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: any;
  @Input() status_color: string;
  @Input() accent_color: string;

  constructor(
      private dialogService: NbDialogService
  ) { }

  ngOnInit() { }

  deleteTask(task: Task) {
    this.dialogService.open(XorComponent, { context: { task: task } });
    // this.tasksService.deleteTask(task);
  }

  openEditTaskModal(task: Task) {
    this.dialogService.open(EditTaskComponent, { context: { task: task } });
  }

}
