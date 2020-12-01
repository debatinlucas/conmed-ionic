import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicoPage } from './medico.page';

describe('MedicoPage', () => {
  let component: MedicoPage;
  let fixture: ComponentFixture<MedicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
