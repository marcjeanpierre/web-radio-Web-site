import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMixComponent } from './load-mix.component';

describe('LoadMixComponent', () => {
  let component: LoadMixComponent;
  let fixture: ComponentFixture<LoadMixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
