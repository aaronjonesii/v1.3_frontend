import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {TasksService} from '../../../../core/services/tasks.service';
import {Task} from '../../../../shared/models/tasks';

@Component({
  selector: 'anon-xor',
  templateUrl: './xor.component.html',
  styleUrls: ['./xor.component.scss']
})
export class XorComponent implements OnInit {
  task: Task;

  constructor(
      private tasksService: TasksService,
      protected dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit() {
  }

  confirmDelete(task: any) {
    this.tasksService.deleteTask(task);
    // alert('Confirmed deletion from XOR Component!! => ' + JSON.stringify(task));
    this.dialogRef.close();
  }

  cancelDelete() {
    // console.log(this.task);
    this.dialogRef.close();
  }

}
