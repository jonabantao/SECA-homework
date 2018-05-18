import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserFormComponent } from './edit-user-form.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditUserFormComponent', () => {
  let component: EditUserFormComponent;
  let fixture: ComponentFixture<EditUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserFormComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [ UsersService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the edit form component', () => {
    expect(component).toBeTruthy();
  });
});
