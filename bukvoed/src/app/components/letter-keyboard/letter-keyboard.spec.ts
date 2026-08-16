import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterKeyboard } from './letter-keyboard';

describe('LetterKeyboard', () => {
  let component: LetterKeyboard;
  let fixture: ComponentFixture<LetterKeyboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterKeyboard],
    }).compileComponents();

    fixture = TestBed.createComponent(LetterKeyboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
