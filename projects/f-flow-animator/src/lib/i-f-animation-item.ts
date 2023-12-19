/**
 * Interface representing a single item in an animation sequence.
 */
export interface IFAnimationItem {

  /**
   * The identifier of the element to be animated.
   */
  id: string;

  /**
   * Optional flag indicating whether the item is a connection in the animation sequence.
   */
  isConnection?: boolean;

  /**
   * Optional duration of the animation for this item in milliseconds. If not provided, the default duration is used.
   */
  duration?: number;
}
