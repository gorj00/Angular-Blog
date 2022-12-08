import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, shareReplay, tap, switchMap, of } from "rxjs";
import { BlogCollectionService } from "src/app/ngrx/data/blog/blog.collection-service";
import { BlogFacade } from "src/app/ngrx/store/blog/blog.facade";
import { IBlogPost } from "src/app/models/blog.models";

@Injectable()
export class BlogDataService {
  private blogPostspaginationSize: number = 5;
  private selectedListPageSubject = new BehaviorSubject<number>(1);
  selectedListPage$ = this.selectedListPageSubject.asObservable();
  private selectedBlogPostIdSubject = new Subject<number>();
  private selectedTagIdSubject = new Subject<number>();
  private selectedBlogPostModeSubjecct = new BehaviorSubject<'read' | 'ëdit'>('read');
  // private editedBlogPostIdSubject = new Subject<number>();

  // INITIAL FETCHES ARE HANDLED IN NGRX EFFECTS IN BLOG STORE
  constructor(
    protected blogPostCS: BlogCollectionService,
    protected blogFacade: BlogFacade
  ) {}

  onChangePage(page: number) {
    this.selectedListPageSubject.next(page)
  }

  tags$ = this.blogFacade.tags$

  blogPosts$ = this.blogPostCS.blogs$.pipe(
    // Warning! If no blogposts, infinite loop
    tap((posts) => !posts?.length && this.blogPostCS.getBlogPosts())
  );

  blogPostsCount$ = this.blogPostCS.blogsCount$;
  listPage$ = combineLatest(this.blogPostsCount$, this.selectedListPage$).pipe(
    distinctUntilChanged(),
    filter(
      ([blogPostCount, selectedListPage]) =>
        blogPostCount > selectedListPage &&
        blogPostCount / this.blogPostspaginationSize >= selectedListPage
    ),
    map(([blogPostCount, listPage]) => (
      listPage
    )),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  paginateBlogPosts(allBlogPosts: IBlogPost[], page: number) {
    return allBlogPosts.slice(
      (page - 1) * this.blogPostspaginationSize,
      page * this.blogPostspaginationSize
    );
  }

  blogPostsPerPage$ = combineLatest(this.blogPosts$, this.listPage$).pipe(
    switchMap(([posts, listPage ]) =>
      of(this.paginateBlogPosts(posts, listPage))
    ),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  data$ = combineLatest(
    this.blogPostCS.loading$,
    this.blogPostsCount$,
    this.blogPostsPerPage$,
    this.listPage$,
    this.tags$,
  ).pipe(
    map(([blogPostsLoading, blogPostsTotal, blogPostsPerPage, page, tags]) => ({
      blogPostsLoading, blogPostsTotal, blogPostsPerPage, page, tags
    })),
    shareReplay({ refCount: true, bufferSize: 1 })
  )
  // tags$
  // selectedBlogPost$
  // selectedTag$
}