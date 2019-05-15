import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { NewestStoriesService } from './newest-stories.service';
import { IItem } from '../app-classes/item';
import { request } from 'https';

describe('NewestStoriesService', () => {
  let newestStoriesService: NewestStoriesService;
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpMock: HttpTestingController;

  const dummyItem: IItem = {
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
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        NewestStoriesService
      ],
    });

    newestStoriesService = TestBed.get(NewestStoriesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', inject([NewestStoriesService], (service: NewestStoriesService) => {
    expect(service).toBeTruthy();
  }));

  
  it("should return a list of item ids from the api", ()=>{
    const dummyItemIds: number[] = [1,2,3,4];
    newestStoriesService.GetNewestStories().subscribe(ids=>{
      expect(ids.length).toBe(4);
      expect(ids).toEqual(dummyItemIds);
    });
    //the url to the api
    const request = httpMock.expectOne(`${newestStoriesService.endPointUrl}GetNewestStories`);

    //the verb we are requesting
    expect(request.request.method).toBe('GET');
    //will returnn the dummy item ids when the api is requested 
    request.flush(dummyItemIds);
  });

  it('should return an item from the api', ()=>{
    newestStoriesService.GetStory(1).subscribe(story=>{
      expect(story).toBeTruthy();
      expect(story).toEqual(dummyItem);
    });

    const request = httpMock.expectOne(`${newestStoriesService.endPointUrl}GetItemDetails?id=1`);

    expect(request.request.method).toBe('GET');
    request.flush(dummyItem);
  });

  it('should return error item if error occurs', ()=>{

    newestStoriesService.GetStory(2).subscribe(story=>{
      expect(story).toBeTruthy();
      expect(story).toEqual(newestStoriesService.errorItem);
    });

    const request = httpMock.expectOne(`${newestStoriesService.endPointUrl}GetItemDetails?id=2`);

    expect(request.request.method).toBe('GET');
    request.flush(dummyItem, {status: 500, statusText: 'Internal Server Error'});
  });

  it('GetStory should cache data in memory', ()=>{
    let story$ = newestStoriesService.GetStory(2);

    story$.subscribe(story=>{
      expect(story).toBeTruthy();
      expect(story).toEqual(dummyItem);
    });

    const request = httpMock.expectOne(`${newestStoriesService.endPointUrl}GetItemDetails?id=2`);

    expect(request.request.method).toBe('GET');
    request.flush(dummyItem);

    story$.subscribe(story=>{
      expect(story).toBeTruthy();
      expect(story).toEqual(dummyItem);
    });

    httpMock.expectNone(`${newestStoriesService.endPointUrl}GetItemDetails?id=2`);
    // request2.flush(dummyItem);
  })
});
