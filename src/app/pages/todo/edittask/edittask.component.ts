import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Task } from 'src/app/shared/models/tasks';
import { XorComponent } from '../xor/xor.component';

@Component({
  selector: 'anon-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.scss']
})
export class EditTaskComponent implements OnInit {

  task: Task;

  constructor(
      private tasksService: TasksService,
      protected dialogRef: NbDialogRef<any>,
      private dialogService: NbDialogService,
  ) { }

  ngOnInit() { }

  updateTask(task: any) {
    // this.tasksService.createTask(task);
    // alert('From editTask component, the task that will be updated => ' + JSON.stringify(task));
    // TODO: Create Form validation functions
    if (task.title && task.description) {
      this.tasksService.updateTask(task);
      this.close();
    } else { alert('Task must have a title and description...'); }
  }

  deleteTask(task: Task) {
    this.dialogService.open(XorComponent, { context: { task: task } });
  }

  close() {
    // console.log(this.task);
    this.dialogRef.close();
  }

}
