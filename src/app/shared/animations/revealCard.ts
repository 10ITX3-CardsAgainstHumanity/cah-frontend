import {animate, state, style, transition} from '@angular/animations';

export const revealCard = [
  state('hidden', style({
    transform: 'rotateY(180deg)'
  })),
  state('revealed', style({
    transform: 'rotateY(0deg)'
  })),
  transition('hidden => revealed', [
    animate('500ms linear')
  ]),
  transition('revealed => hidden', [
    animate('500ms linear')
  ])
];
