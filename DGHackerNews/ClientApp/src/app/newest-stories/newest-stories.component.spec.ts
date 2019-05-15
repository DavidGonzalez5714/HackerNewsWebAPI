import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestStoriesComponent } from './newest-stories.component';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { IItem } from '../../app-classes/item';
import { DebugElement } from '@angular/core';
import { NewestStoriesService } from '../newest-stories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { By } from '@angular/platform-browser';
import { StoryLinkComponent } from '../story-link/story-link.component';

describe('NewestStoriesComponent', () => {
  let component: NewestStoriesComponent;
  let fixture: ComponentFixture<NewestStoriesComponent>;

  let newestStoriesService: NewestStoriesService;
  let getNewestStoriesSpy;
  let getStorySpy;
  let newestStoriesSpy: jasmine.Spy;

  let newestStoryIdsMock: Observable<number[]> = of([1,2,3,4]);
  let newestStoryMock:Observable<IItem>[] = [of({
      "by" : "dhouston",
      "descendants" : 71,
      "id" : 8863,
      "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
      "score" : 111,
      "time" : 1175714200,
      "title" : "My YC app: Dropbox - Throw away your USB drive",
      "type" : "story",
      "url" : "http://www.getdropbox.com/u/2/screencast.html",
      dead: false,
      deleted: false,
      parent: null,
      parts: null,
      poll: null,
      text: 'TEXT'
    })];

  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestStoriesComponent, StoryLinkComponent ],
      providers: [NewestStoriesService],
      imports: [HttpClientTestingModule, NgxPaginationModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugElement = fixture.debugElement;

    newestStoriesService = debugElement.injector.get(NewestStoriesService);
    

    getNewestStoriesSpy = spyOn(newestStoriesService, 'GetNewestStories').and.callThrough().and.returnValue(newestStoryIdsMock);
    newestStoriesSpy = spyOn(newestStoriesService, 'newestStories').and.callThrough().and.returnValue(newestStoryIdsMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should contain element to display list of newest stories', ()=>{
    let element = fixture.debugElement.query(By.css('#stories'));

    expect(element).toBeTruthy();
  });

  it('component.items should call homeservice.newestStories', ()=>{
    expect(component.items).toBeTruthy();
  });

  it('stories should equal 4', ()=>{
    //want to know that my test is working. I want to know that the component items is callnig the get newest stories function
    component.items.subscribe(stories=>{
      expect(stories.length).toEqual(4);
    });
  });
});
