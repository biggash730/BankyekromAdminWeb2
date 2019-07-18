import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAudioFormComponent } from './default-audio-form.component';

describe('DefaultAudioFormComponent', () => {
  let component: DefaultAudioFormComponent;
  let fixture: ComponentFixture<DefaultAudioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultAudioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultAudioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
