import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, shareReplay, tap, switchMap, of } from "rxjs";
import { BlogCollectionService } from "src/app/ngrx/data/blog/blog.collection-service";
import { BlogFacade } from "src/app/ngrx/store/blog/blog.facade";
import { BlogPost } from "src/app/models/blog.models";

@Injectable()
export class BlogDataService {
  private blogPostspaginationSize: number = 5;
  private selectedListPage = new BehaviorSubject<number>(1);
  selectedListPage$ = this.selectedListPage.asObservable();
  private selectedBlogPostIdSubject = new Subject<number>();
  private selectedTagIdSubject = new Subject<number>();
  private editedBlogPostIdSubject = new Subject<number>();

  // INITIAL FETCHES ARE HANDLED IN NGRX EFFECTS
  constructor(
    protected blogPostCS: BlogCollectionService,
    protected blogFacade: BlogFacade
  ) {}

  blogPosts$ = this.blogPostCS.blogs$.pipe(
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
    map(([blogPostCount, selectedListPage]) => ({
      selectedListPage,
    })),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  paginateBlogPosts(allBlogPosts: typeof BlogPost[], page: number) {
    return allBlogPosts.slice(
      (page - 1) * this.blogPostspaginationSize,
      page * this.blogPostspaginationSize
    );
  }

  blogPostsPerPage$ = combineLatest(this.blogPosts$, this.listPage$).pipe(
    switchMap(([posts, { selectedListPage }]) =>
      of(this.paginateBlogPosts(posts, selectedListPage))
    )
  );
  // tags$
  // selectedBlogPost$
  // selectedTag$
}
