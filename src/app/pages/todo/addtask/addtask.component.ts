import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';
import { Task } from 'src/app/shared/models/tasks';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'anon-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddTaskComponent implements OnInit {

  // task: Task;
  task = {
    title: '',
    description: '',
    status: 'BACKLOG',
    tags: '["test"]',
  };

  constructor(
      private tasksService: TasksService,
      protected dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit() {
  }

  createTask(task: any) {
    // TODO: Create Form validation functions
    if (task.title && task.description) {
      this.tasksService.createTask(task);
      this.close();
    } else { alert('Task must have a title and description...'); }
  }

  close() {
    // console.log(this.task);
    this.dialogRef.close();
  }

}
