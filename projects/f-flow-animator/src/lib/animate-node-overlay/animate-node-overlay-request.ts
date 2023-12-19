export class AnimateNodeOverlayRequest {

  constructor(
      public readonly element: HTMLElement,
      public readonly duration: number,
  ) {
  }
}
