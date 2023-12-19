import { CreateConnectionOverlayRequest } from './create-connection-overlay-request';

export class CreateConnectionOverlayHandler {

  public handle(request: CreateConnectionOverlayRequest): SVGPathElement {
    const svgNS = "http://www.w3.org/2000/svg";
    const result = document.createElementNS(svgNS, 'path');
    result.classList.add('f-animation', 'f-animated-connection');
    result.setAttribute('d', request.element.getAttribute('d')!);

    const parentElement = request.element.parentElement!;
    parentElement.appendChild(result);

    return result;
  }
}
