import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, shareReplay, tap, switchMap, of, startWith } from "rxjs";
import { BlogCollectionService } from "src/app/ngrx/data/blog/blog.collection-service";
import { BlogFacade } from "src/app/ngrx/store/blog/blog.facade";
import { IBlogPost, EBlogModes } from "src/app/models/blog.models";
@Injectable()
export class BlogDataService {
  private blogPostspaginationSize: number = 5;
  private selectedListPageSubject = new BehaviorSubject<number>(1);
  selectedListPage$ = this.selectedListPageSubject.asObservable();
  private selectedBlogPostIdSubject = new BehaviorSubject<number | null>(null);
  selectedBlogPostId$ = this.selectedBlogPostIdSubject.asObservable();
  // private selectedTagIdSubject = new Subject<number>();
  private selectedBlogPostModeSubjecct = new Subject<EBlogModes>();
  // private editedBlogPostIdSubject = new Subject<number>();

  // INITIAL FETCHES ARE HANDLED IN NGRX EFFECTS IN BLOG STORE
  constructor(
    protected blogPostCS: BlogCollectionService,
    protected blogFacade: BlogFacade
  ) {}

  onChangePage(page: number) {
    this.selectedListPageSubject.next(page)
  }

  onSelectBlogPost(blogPostId: number | null, mode: EBlogModes = EBlogModes.READ) {
    this.selectedBlogPostIdSubject.next(blogPostId)
    this.selectedBlogPostModeSubjecct.next(mode)
  }

  tags$ = this.blogFacade.tags$
  tagsById$ = this.blogFacade.tagsById$

  blogPosts$ = this.blogPostCS.blogs$.pipe(
    startWith([])
  )
  selectedBlogPost$ = this.selectedBlogPostId$.pipe(
    switchMap((blogPostId: number | null) => {
      console.log('post it ', blogPostId)
      if (blogPostId) {
        return this.blogPostCS.getBlogPostById(blogPostId)
      } else {
        return of(null)
      }
    }),
    shareReplay({ refCount: true, bufferSize: 1 }),
  )

  blogPostsCount$ = this.blogPostCS.blogsCount$.pipe(
    startWith(0)
  )
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
    return allBlogPosts?.length ? allBlogPosts.slice(
      (page - 1) * this.blogPostspaginationSize,
      page * this.blogPostspaginationSize
    ) : [];
  }

  blogPostsPerPage$ = combineLatest(this.blogPosts$, this.listPage$).pipe(
    switchMap(([posts, listPage ]) =>
      of(this.paginateBlogPosts(posts, listPage))
    ),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  data$ = combineLatest(
    this.blogPostCS.loading$.pipe(
      startWith(false)
    ),
    this.blogPostsCount$,
    this.blogPostsPerPage$,
    this.listPage$,
    this.tags$,
    this.tagsById$,
    this.selectedBlogPost$
  ).pipe(
    map(([blogPostsLoading, blogPostsTotal, blogPostsPerPage, page, tags, tagsById, selectedBlogPost]) => ({
      blogPostsLoading, blogPostsTotal, blogPostsPerPage, page, tags, tagsById, selectedBlogPost
    })),
    tap(obj => console.log(obj)),
    shareReplay({ refCount: true, bufferSize: 1 }),
  )
  // tags$
  // selectedBlogPost$
  // selectedTag$
}
