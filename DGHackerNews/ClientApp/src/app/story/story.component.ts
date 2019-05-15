import { Component, OnInit, Input } from '@angular/core';
import { IItem } from '../../app-classes/item';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() item: IItem;

  constructor() { }

  ngOnInit() {
  }

}
