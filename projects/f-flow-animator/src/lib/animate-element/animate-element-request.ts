/**
 * Class representing a request to animate a specific element.
 */
export class AnimateElementRequest {

  /**
   * Creates an instance of AnimateElementRequest.
   * @param {HTMLElement | SVGPathElement} element - The element to be animated.
   * @param {number} duration - The duration of the animation in milliseconds.
   */
  constructor(
      public readonly element: HTMLElement | SVGPathElement,
      public readonly duration: number,
  ) {
  }
}
