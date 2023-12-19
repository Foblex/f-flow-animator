import { AnimateConnectionOverlayRequest } from './animate-connection-overlay-request';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { CreateConnectionOverlayHandler } from '../create-connection-overlay/create-connection-overlay.handler';
import { CreateConnectionOverlayRequest } from '../create-connection-overlay/create-connection-overlay-request';
import { Observable } from 'rxjs';

export class AnimateConnectionOverlayHandler {

  constructor(
      private animationBuilder: AnimationBuilder,
  ) {
  }

  public handle(request: AnimateConnectionOverlayRequest): Observable<SVGPathElement> {
    const overlayElement = new CreateConnectionOverlayHandler().handle(
        new CreateConnectionOverlayRequest(request.element)
    );

    const length = overlayElement.getTotalLength();
    overlayElement.style.strokeDasharray = length + ' ' + length;
    overlayElement.style.strokeDashoffset = String(length);

    const animation = this.animationBuilder.build([
      style({ strokeDashoffset: length }),
      animate(request.duration + 'ms', style({ strokeDashoffset: 0 }))
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
