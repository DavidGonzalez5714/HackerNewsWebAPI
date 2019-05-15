import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, mergeMap, catchError, tap, share, shareReplay } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { IItem } from '../app-classes/item';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NewestStoriesService {
  constructor(private http: HttpClient) { }
  
  // private storyMemoryCache = {};

  public endPointUrl: string = 'api/HackerNews/';
  private readonly httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
  //todo: write test to enforce this property stays a readonly property
  //todo: write a test to enforce this calls certain methods
  //todo: write a test to enforce that this returns the specific type
  // private _newestStories: Observable<Observable<IItem>[]> = undefined;
  // public get newestStories(): Observable<Observable<IItem>[]> {
  //   if (this._newestStories === undefined) {
  //       this._newestStories = this.GetNewestStories().pipe(map(storyIds => {
  //       let items$: Observable<IItem>[] = [];
  //       items$ = _.map(storyIds, (id: number) => this.GetStory(id));
  //       return items$;
  //     }));
  //   }
  //   return this._newestStories;
  // }

  public newestStories(): Observable<Observable<IItem>[]> {
    let newestStories = this.GetNewestStories().pipe(map(storyIds => {
      let items$: Observable<IItem>[] = [];
      items$ = _.map(storyIds, (id: number) => this.GetStory(id));
      return items$;
    }));

    return newestStories;
  }

  public errorItem: IItem = {
    "by" : null,
    "descendants" : null,
    "id" : -1,
    "kids" : null,
    "score" : null,
    "time" : null,
    "title" : "An error occured",
    "type" : null,
    "url" : '#',
    dead: false,
    deleted: false,
    parent: null,
    parts: null,
    poll: null,
    text: null
  }

  //get the list of new stories
  /**
   * GetNewestStories
   */
  public GetNewestStories(): Observable<number[]> {
    // need to acually define the request to the api here
    //todo: make the endpoint just one word
    return this.http.get<number[]>(this.endPointUrl + "GetNewestStories", )

  }
  //get a specific story
  /**
   * GetStory
   */
  public GetStory(id: number): Observable<IItem> {
    let cacheKey: string = 'GetItemDetails_' + id;
    // let story: IItem = this.getStoryFromCache(cacheKey);
// debugger;
    // if(story){
    //   return of(story)
    // }
    // else{
      let data = {
        id: id.toString()
      };
      
      const params = new HttpParams({ fromObject: data })
      //todo: add error handling 
      return this.http.get<IItem>(this.endPointUrl + 'GetItemDetails', {params: params}).pipe(
        catchError(err=> of(this.errorItem)), 
        // tap(story=> {
        //   this.setStoryInCache(story, cacheKey);
        // }),
        //shareReplay will prevent multiple requests to the server for the same story, a dumbed down version of caching
        shareReplay()
      );
    // }
  }

  // public getStoryFromCache(cacheKey: string): IItem{
  //   return this.storyMemoryCache[cacheKey];
  // }
  
  // public setStoryInCache(story: IItem, cacheKey: string): void{
  //   this.storyMemoryCache[cacheKey] = story;
  // }

}
