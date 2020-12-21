import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicResultsComponent } from './graphic-results.component';

describe('GraphicResultsComponent', () => {
  let component: GraphicResultsComponent;
  let fixture: ComponentFixture<GraphicResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
