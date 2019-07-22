import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersMapComponent } from './partners-map.component';

describe('PartnersMapComponent', () => {
  let component: PartnersMapComponent;
  let fixture: ComponentFixture<PartnersMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
