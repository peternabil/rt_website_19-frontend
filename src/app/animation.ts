import {
   transition,
   trigger,
   query,
   style,
   animate,
   group,
   animateChild
} from '@angular/animations';
export const slideInAnimation =
   trigger('routeAnimations', [
        transition('* => *', [
             query(':enter, :leave',
                  style({ position: 'fixed',  width: '100%' }),
                  { optional: true }),
             group([
                  query(':enter', [
                      style({ transform: 'translateY(100%)' }),
                      animate('1.5s ease-in-out',
                      style({ transform: 'translateY(0%)' }))
                  ], { optional: true }),
                  query(':leave', [
                      style({ transform: 'translateY(0%)' }),
                      animate('1s ease-in-out',
                      style({ transform: 'translateY(100%)' }))
                      ], { optional: true }),
              ])
        ]),
]);
// export const footer_slideInAnimation =
//    trigger('footer_routeAnimations', [
//         transition('* => *', [
//              query(':enter, :leave',
//                   style({ position: 'fixed',  width: '100%' }),
//                   { optional: true }),
//              group([
//                   query(':enter', [
//                       style({ transform: 'translateY(100%)' }),
//                       animate('3.5s ease-in-out',
//                       style({ transform: 'translateY(0%)' }))
//                   ], { optional: true }),
//                   query(':leave', [
//                       style({ transform: 'translateY(0%)' }),
//                       animate('0.5s ease-in-out',
//                       style({ transform: 'translateY(100%)' }))
//                       ], { optional: true }),
//               ])
//         ]),
// ]);
