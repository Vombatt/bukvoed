import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterInput } from './letter-input';

describe('LetterInput', () => {
  let component: LetterInput;
  let fixture: ComponentFixture<LetterInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterInput],
    }).compileComponents();

    fixture = TestBed.createComponent(LetterInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
