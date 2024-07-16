import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossMarginBarChartComponent } from './gross-margin-bar-chart.component';

describe('GrossMarginBarChartComponent', () => {
  let component: GrossMarginBarChartComponent;
  let fixture: ComponentFixture<GrossMarginBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrossMarginBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrossMarginBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
