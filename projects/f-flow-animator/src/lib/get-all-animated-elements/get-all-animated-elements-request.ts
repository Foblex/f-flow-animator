import { IFAnimationItem } from '../i-f-animation-item';

export class GetAllAnimatedElementsRequest {

  constructor(
      public readonly flowId: string,
      public readonly items: IFAnimationItem[][]
  ) {
  }
}
