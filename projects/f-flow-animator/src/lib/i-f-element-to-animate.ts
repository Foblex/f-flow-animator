/**
 * Interface representing an element to be animated, with its associated properties.
 */
export interface IFElementToAnimate {

  /**
   * The DOM element to be animated.
   */
  element: HTMLElement | SVGPathElement;

  /**
   * The duration of the animation for this element in milliseconds.
   */
  duration: number;
}
