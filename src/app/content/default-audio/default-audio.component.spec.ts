import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAudioComponent } from './default-audio.component';

describe('DefaultAudioComponent', () => {
  let component: DefaultAudioComponent;
  let fixture: ComponentFixture<DefaultAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
