import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDirectoryComponent } from './update-directory.component';

describe('UpdateDirectoryComponent', () => {
  let component: UpdateDirectoryComponent;
  let fixture: ComponentFixture<UpdateDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDirectoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
