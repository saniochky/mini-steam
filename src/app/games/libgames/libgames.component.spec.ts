import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibgamesComponent } from './libgames.component';

describe('LibgamesComponent', () => {
  let component: LibgamesComponent;
  let fixture: ComponentFixture<LibgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibgamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
