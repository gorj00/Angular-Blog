import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, shareReplay, tap, switchMap, of, startWith } from "rxjs";
import { BlogCollectionService } from "src/app/ngrx/data/blog/blog.collection-service";
import { BlogFacade } from "src/app/ngrx/store/blog/blog.facade";
import { IBlogPost, EBlogModes } from "src/app/models/blog.models";
@Injectable()
export class BlogDataService {
  private blogPostspaginationSize: number = 5;
  private selectedListPageSubject = new BehaviorSubject<number>(1);
  selectedListPage$ = this.selectedListPageSubject.asObservable();
  private selectedBlogPostModeSubjecct = new BehaviorSubject<EBlogModes>(
    EBlogModes.READ
  );
  selectedBlogPostMode$ = this.selectedBlogPostModeSubjecct.asObservable();
  private editedBlogPostSubject = new BehaviorSubject<IBlogPost | null>(null);
  editedBlogPost$ = this.editedBlogPostSubject.asObservable();

  // INITIAL FETCHES ARE HANDLED IN NGRX EFFECTS IN BLOG STORE
  constructor(
    protected blogPostCS: BlogCollectionService,
    protected blogFacade: BlogFacade
  ) {}

  onChangePage(page: number) {
    this.selectedListPageSubject.next(page);
    console.log(page)
  }

  updateBlogPost(post: IBlogPost) {
    this.blogPostCS.updateBlogPost(post)
  }

  addTagToBlogPost(tagId: number, blogPostId: number) {
    this.blogFacade.addTagToBlogPost(tagId, blogPostId)
  }

  createNewTag(name: string) {
    this.blogFacade.crateNewTag({name})
    // the tag is then added to the current selected blogPost in addNewlyCreatedTagToSelectedBlogPostEffect
  }

  onSelectBlogPost(
    mode: EBlogModes = EBlogModes.READ
  ) {
    this.selectedBlogPostModeSubjecct.next(mode);
  }

  tags$ = this.blogFacade.tags$;
  tagsById$ = this.blogFacade.tagsById$;

  blogPosts$ = this.blogPostCS.blogs$.pipe(
    startWith([]),
    // TODO: Delete
    tap((blogs) => !blogs?.length && this.blogPostCS.getBlogPosts())
  );

  selectedBlogPost$ = this.blogPostCS.selectedBlog$;

  blogPostsCount$ = this.blogPostCS.blogsCount$.pipe(startWith(0));
  listPage$ = combineLatest(this.blogPostsCount$, this.selectedListPage$).pipe(
    distinctUntilChanged(),
    // filter(
    //   ([blogPostCount, selectedListPage]) =>
    //     blogPostCount > selectedListPage &&
    //     blogPostCount / this.blogPostspaginationSize >= selectedListPage
    // ),
    map(([blogPostCount, listPage]) => listPage),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  paginateBlogPosts(allBlogPosts: IBlogPost[], page: number) {
    return allBlogPosts?.length
      ? allBlogPosts.slice(
          (page - 1) * this.blogPostspaginationSize,
          page * this.blogPostspaginationSize
        )
      : [];
  }

  blogPostsPerPage$ = combineLatest(this.blogPosts$, this.listPage$).pipe(
    switchMap(([posts, listPage]) =>
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
    this.tagsById$,
    this.selectedBlogPost$,
    this.editedBlogPost$,
    this.selectedBlogPostMode$
  ).pipe(
    distinctUntilChanged(),
    map(
      ([
        blogPostsLoading,
        blogPostsTotal,
        blogPostsPerPage,
        page,
        tags,
        tagsById,
        selectedBlogPost,
        editedBlogPost,
        selectedBlogPostMode,
      ]) => ({
        blogPostsLoading,
        blogPostsTotal,
        blogPostsPerPage,
        page,
        tags,
        tagsById,
        selectedBlogPost,
        editedBlogPost,
        selectedBlogPostMode,
      })
    ),
    // tap((obj) => console.log(obj)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
}
