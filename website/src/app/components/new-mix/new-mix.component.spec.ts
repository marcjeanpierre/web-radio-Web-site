import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMixComponent } from './new-mix.component';

describe('AcceuilComponent', () => {
  let component: NewMixComponent;
  let fixture: ComponentFixture<NewMixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
