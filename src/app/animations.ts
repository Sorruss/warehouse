import { animate, style, transition, trigger } from '@angular/animations';

export const notificationFadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }),
    animate(500, style({ opacity: 1, transform: 'translateY(0px)' })),
  ]),
]);

export const notificationFadeOut = trigger('fadeOut', [
  transition(':leave', [animate(500, style({ opacity: 0 }))]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(300, style({ opacity: 1 })),
  ]),
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [animate(300, style({ opacity: 0 }))]),
]);

export const slide2right = trigger('slide2right', [
  transition(':leave', [
    animate(
      300,
      style({
        opacity: 0,
        transform: 'translateX(50px)',
        width: 'calc(100% - 50px)',
      })
    ),
  ]),
]);
