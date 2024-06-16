import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeFormComponent } from './outcome-form.component';

describe('OutcomeFormComponent', () => {
  let component: OutcomeFormComponent;
  let fixture: ComponentFixture<OutcomeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutcomeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutcomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
