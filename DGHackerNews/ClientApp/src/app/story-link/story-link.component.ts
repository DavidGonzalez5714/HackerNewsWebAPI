import { Component, OnInit, Input } from '@angular/core';
import { IItem } from '../../app-classes/item';

@Component({
  selector: 'app-story-link',
  templateUrl: './story-link.component.html',
  styleUrls: ['./story-link.component.css']
})
export class StoryLinkComponent implements OnInit {
  @Input() public item: IItem;

  constructor() { }

  ngOnInit() {
  }

}
