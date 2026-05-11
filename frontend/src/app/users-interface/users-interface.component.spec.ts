import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInterfaceComponent } from './users-interface.component';

describe('UsersInterfaceComponent', () => {
  let component: UsersInterfaceComponent;
  let fixture: ComponentFixture<UsersInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
