import { AnimateElementRequest } from './animate-element-request';
import { AnimationBuilder } from '@angular/animations';
import { Observable } from 'rxjs';
import { AnimateConnectionOverlayHandler } from '../animate-connection-overlay/animate-connection-overlay.handler';
import { AnimateConnectionOverlayRequest } from '../animate-connection-overlay/animate-connection-overlay-request';
import { AnimateNodeOverlayHandler } from '../animate-node-overlay/animate-node-overlay.handler';
import { AnimateNodeOverlayRequest } from '../animate-node-overlay/animate-node-overlay-request';

/**
 * Handler for processing animation requests for individual elements.
 */
export class AnimateElementHandler {

  /**
   * Creates an instance of AnimateElementHandler.
   * @param {AnimationBuilder} animationBuilder - The AnimationBuilder service for creating animations.
   */
  constructor(
      private animationBuilder: AnimationBuilder,
  ) {
  }

  /**
   * Handles the provided animation request and returns an Observable for the animation process.
   * @param {AnimateElementRequest} request - The animation request to be handled.
   * @return {Observable<HTMLElement | SVGPathElement>} An Observable emitting the animated element.
   */
  public handle(request: AnimateElementRequest): Observable<HTMLElement | SVGPathElement> {
    let result: Observable<HTMLElement | SVGPathElement>;

    if (request.element instanceof SVGPathElement) {
      result = this.animateConnection(request);
    } else {
      result = this.animateNode(request);
    }

    return result;
  }

  private animateConnection(request: AnimateElementRequest): Observable<SVGPathElement> {
    const result = new AnimateConnectionOverlayHandler(this.animationBuilder).handle(
        new AnimateConnectionOverlayRequest(request.element as SVGPathElement, request.duration)
    );

    return result;
  }

  private animateNode(request: AnimateElementRequest): Observable<HTMLElement> {
    const result = new AnimateNodeOverlayHandler(this.animationBuilder).handle(
        new AnimateNodeOverlayRequest(request.element as HTMLElement, request.duration)
    );

    return result;
  }
}
