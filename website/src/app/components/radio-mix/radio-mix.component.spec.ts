import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioMixComponent } from './radio-mix.component';

describe('RadioMixComponent', () => {
  let component: RadioMixComponent;
  let fixture: ComponentFixture<RadioMixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioMixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
