import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostEditTagsComponent } from './blog-post-edit-tags.component';

describe('BlogPostEditTagsComponent', () => {
  let component: BlogPostEditTagsComponent;
  let fixture: ComponentFixture<BlogPostEditTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostEditTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostEditTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
