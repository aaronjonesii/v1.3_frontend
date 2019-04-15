import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';
import { NbDialogRef } from '@nebular/theme';
import { Task } from 'src/app/shared/models/tasks';

@Component({
  selector: 'anon-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EditTaskComponent implements OnInit {

  task: Task;

  constructor(
      private tasksService: TasksService,
      protected dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit() {
  }

  updateTask(task: any) {
    // this.tasksService.createTask(task);
    // alert('From editTask component, the task that will be updated => ' + JSON.stringify(task));
    this.tasksService.updateTask(task)
    this.close();
  }

  close() {
    // console.log(this.task);
    this.dialogRef.close();
  }

}
