import { AnimateNodeOverlayRequest } from './animate-node-overlay-request';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { Observable } from 'rxjs';
import { CreateNodeOverlayHandler } from '../create-node-overlay/create-node-overlay.handler';
import { CreateNodeOverlayRequest } from '../create-node-overlay/create-node-overlay-request';

export class AnimateNodeOverlayHandler {

  constructor(
      private animationBuilder: AnimationBuilder,
  ) {
  }

  public handle(request: AnimateNodeOverlayRequest): Observable<HTMLElement> {
    const overlayElement = new CreateNodeOverlayHandler().handle(
        new CreateNodeOverlayRequest(request.element)
    );

    const animation = this.animationBuilder.build([
      style({ height: '0px' }),
      animate(request.duration + 'ms', style({ height: `${ request.element.offsetHeight }px` }))
    ]);

    const player: AnimationPlayer = animation.create(overlayElement);

    return new Observable((observer) => {
      player.onDone(() => {
        observer.next(overlayElement);
        observer.complete();
      });
      player.play();
    });
  }
}
