import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedStringComponent } from './formatted-string.component';

describe('FormattedStringComponent', () => {
  let component: FormattedStringComponent;
  let fixture: ComponentFixture<FormattedStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormattedStringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormattedStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
