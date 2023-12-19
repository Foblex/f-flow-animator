import { Inject, Injectable } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { concatMap, finalize, forkJoin, from, Observable, Subscriber, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AnimateElementHandler } from './animate-element/animate-element.handler';
import { AnimateElementRequest } from './animate-element/animate-element-request';
import { GetAllAnimatedElementsRequest } from './get-all-animated-elements/get-all-animated-elements-request';
import { GetAllAnimatedElementsHandler } from './get-all-animated-elements/get-all-animated-elements.handler';
import { IFAnimationResult } from './i-f-animation-result';
import { IFAnimationConfiguration } from './i-f-animation-configuration';
import { IFElementToAnimate } from './i-f-element-to-animate';

/**
 * Service for animating elements in the @foblex/flow-animator library.
 * This service handles the orchestration of animations for elements.
 */
@Injectable({
  providedIn: 'root'
})
export class FFlowAnimatorService {

  /**
   * Creates an instance of FFlowAnimatorService.
   * @param {AnimationBuilder} animationBuilder - The AnimationBuilder service for creating animations.
   * @param {Document} document - The DOM Document object to interact with the DOM.
   */
  constructor(
      private animationBuilder: AnimationBuilder,
      @Inject(DOCUMENT) private document: Document
  ) {
  }

  /**
   * Initiates the animation process for the specified flow.
   * @param {any} flowId - The identifier of the flow to be animated.
   * @param {IFAnimationConfiguration} configuration - The configuration settings for the animation.
   * @return {Observable<IFAnimationResult>} An Observable that emits the result of the animation process.
   */
  public animate(flowId: any, configuration: IFAnimationConfiguration): Observable<IFAnimationResult> {
    return new Observable((observer) => {
      setTimeout(() => {
        const toAnimate = new GetAllAnimatedElementsHandler(this.document).handle(
            new GetAllAnimatedElementsRequest(flowId, configuration.items)
        );
        this.animateSequentially(toAnimate, configuration, observer);
      }, 0);
    });
  }

  /**
   * Animates elements sequentially according to the provided configuration.
   * @private
   * @param {IFElementToAnimate[][]} rows - A two-dimensional array of elements to animate in sequence.
   * @param {IFAnimationConfiguration} configuration - The configuration settings for the animation.
   * @param {Subscriber<IFAnimationResult>} observer - The observer to emit the results to.
   */
  private animateSequentially(rows: IFElementToAnimate[][], configuration: IFAnimationConfiguration, observer: Subscriber<IFAnimationResult>): void {
    const singleDuration = configuration.duration / rows.length;
    let toRemove: (HTMLElement | SVGPathElement)[] = [];

    from(rows).pipe(
        concatMap((row, index: number) =>
            forkJoin(
                row.map(x => this.animateElement(x.element, x.duration || singleDuration).pipe(
                    tap((overlayElement) => {
                      toRemove.push(overlayElement);
                    })
                ))
            ).pipe(
                finalize(() => {
                  if (configuration.removeOverlayAfterRowComplete) {
                    toRemove = this.removeCreatedElements(toRemove);
                  }
                  observer.next({ completeRowIndex: index });
                })
            )
        ),
        finalize(() => {
          if (!configuration.removeOverlayAfterRowComplete) {
            toRemove = this.removeCreatedElements(toRemove);
          }
          observer.next({ completeAll: true });
          observer.complete();
        })
    ).subscribe();
  }

  /**
   * Animates an individual element.
   * @private
   * @param {(HTMLElement | SVGPathElement)} element - The element to be animated.
   * @param {number} duration - The duration of the animation in milliseconds.
   * @return {Observable<HTMLElement | SVGPathElement>} An Observable that emits the animated element.
   */
  private animateElement(element: (HTMLElement | SVGPathElement), duration: number): Observable<HTMLElement | SVGPathElement> {
    return new AnimateElementHandler(this.animationBuilder).handle(
        new AnimateElementRequest(element, duration)
    );
  }

  /**
   * Removes the specified elements from the DOM.
   * @private
   * @param {(HTMLElement | SVGPathElement)[]} toRemove - The elements to be removed.
   * @return {(HTMLElement | SVGPathElement)[]} An array of the removed elements.
   */
  private removeCreatedElements(toRemove: (HTMLElement | SVGPathElement)[]): (HTMLElement | SVGPathElement)[] {
    toRemove.forEach(x => x.remove());
    return [];
  }
}
