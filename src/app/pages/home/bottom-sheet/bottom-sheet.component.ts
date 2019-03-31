import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

declare var eva: any;

@Component({
  selector: 'anon-bottom-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
  ) { }

    items = [
    { title: 'Admin Dashboard', desc: 'Administrator Dashboard to manage this WebApp.',
      link: 'admin', icon: 'browser-outline'},
    { title: 'Apple Music Player', desc: 'Browse Apple Music Top Charts or play music from your account.',
      link: 'music', icon: 'music-outline' },
    { title: 'Blog', desc: 'Posts including knowledge of the broad topic of Technology.',
      url: 'blog', icon: 'list-outline' },
    { title: 'IP Lookup', desc: 'Enter IP Address to get location information.',
      link: 'ip', icon: 'globe-outline' },
    { title: 'Movie Library', desc: 'Movie collection of 10,000+ with download links.',
      link: 'movies', icon: 'film-outline' },
    { title: 'ToDo List', desc: 'Keep track of task in a SCRUM format.',
      link: 'todo', icon: 'checkmark-square-outline' },
  ];

  ngOnInit() {

    // Customize Eva Icons for Bottom Sheet
    eva.replace();

  }

  closeBottomSheet() {
    this.bottomSheetRef.dismiss();
  }

}
