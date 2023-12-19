import { CreateNodeOverlayRequest } from './create-node-overlay-request';

export class CreateNodeOverlayHandler {

  public handle(request: CreateNodeOverlayRequest): HTMLElement {
    const result = document.createElement('div');
    result.classList.add('f-animation', 'f-animated-node');
    result.style.position = 'absolute';
    result.style.width = `${ request.element.clientWidth }px`;
    result.style.height = '0px';
    result.style.top = `0px`;
    result.style.left = `0px`;
    result.style.zIndex = '1';

    request.element.appendChild(result);

    return result;
  }
}
