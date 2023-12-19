import { IFAnimationItem } from './i-f-animation-item';

/**
 * Interface representing the configuration settings for an animation sequence.
 */
export interface IFAnimationConfiguration {

  /**
   * A two-dimensional array of animation items, each row representing a sequence of animations to be played in order.
   */
  items: IFAnimationItem[][];

  /**
   * The total duration of the animation sequence in milliseconds.
   */
  duration: number;

  /**
   * A flag indicating whether to remove the overlay after each row of animations is complete.
   */
  removeOverlayAfterRowComplete: boolean;
}
