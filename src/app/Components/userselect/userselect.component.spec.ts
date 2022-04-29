import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserselectComponent } from './userselect.component';

describe('UserselectComponent', () => {
  let component: UserselectComponent;
  let fixture: ComponentFixture<UserselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
