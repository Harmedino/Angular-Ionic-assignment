import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouseDetailsComponent } from './couse-details.component';

describe('CouseDetailsComponent', () => {
  let component: CouseDetailsComponent;
  let fixture: ComponentFixture<CouseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouseDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
