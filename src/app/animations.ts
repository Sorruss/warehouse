import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }),
    animate(500, style({ opacity: 1, transform: 'translateY(0px)' })),
  ]),
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [animate(500, style({ opacity: 0 }))]),
]);
