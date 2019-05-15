import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryLinkComponent } from './story-link.component';
import { By } from '@angular/platform-browser';
import { IItem } from '../../app-classes/item';

describe('StoryLinkComponent', () => {
  let component: StoryLinkComponent;
  let fixture: ComponentFixture<StoryLinkComponent>;

  let itemMock: IItem = {
    "by" : "dhouston",
    "descendants" : 71,
    "id" : 8863,
    "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
    "score" : 111,
    "time" : 1175714200,
    "title" : "My YC app: Dropbox - Throw away your USB drive",
    "type" : "story",
    "url" : "https://www.getdropbox.com/u/2/screencast.html",
    dead: false,
    deleted: false,
    parent: null,
    parts: null,
    poll: null,
    text: 'TEXT'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryLinkComponent);
    component = fixture.componentInstance;

    component.item = itemMock;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have property: item', ()=>{
    expect(component.item).toBeTruthy();
  });

  it('clicking the title should route user to the story', ()=>{
    let href = fixture.debugElement.query(By.css('#storyLink')).nativeElement.getAttribute('href');

    expect(href).toEqual(itemMock.url);
  });
});
