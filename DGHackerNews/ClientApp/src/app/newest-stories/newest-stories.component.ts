import { Component, OnInit } from '@angular/core';
import { NewestStoriesService } from '../newest-stories.service';
import { Observable } from 'rxjs';
import { IItem } from '../../app-classes/item';

@Component({
  selector: 'app-newest-stories',
  templateUrl: './newest-stories.component.html',
  styleUrls: ['./newest-stories.component.css']
})
export class NewestStoriesComponent implements OnInit {

  constructor(private homeService: NewestStoriesService) { }

  public pagerPage: number = 1;
  //todo: write a test that items is not undefined
  //todo: write a test that this returns the same value as the newest storeies 
      //this should enforce that the items should be equal to the items on the service
  private _items: Observable<Observable<IItem>[]> = undefined;
  public get items(): Observable<Observable<IItem>[]> {
    if (!this._items) {
      this._items = this.homeService.newestStories();
    }
    return this._items;
  }


  ngOnInit() {
    
  }

}
