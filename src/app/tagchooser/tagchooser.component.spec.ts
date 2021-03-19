import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagchooserComponent } from './tagchooser.component';

describe('TagchooserComponent', () => {
  let component: TagchooserComponent;
  let fixture: ComponentFixture<TagchooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagchooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagchooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
