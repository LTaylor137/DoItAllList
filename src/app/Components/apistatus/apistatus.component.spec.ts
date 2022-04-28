import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApistatusComponent } from './apistatus.component';

describe('ApistatusComponent', () => {
  let component: ApistatusComponent;
  let fixture: ComponentFixture<ApistatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApistatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApistatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
