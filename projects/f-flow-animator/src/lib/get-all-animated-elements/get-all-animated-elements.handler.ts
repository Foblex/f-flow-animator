import { GetAllAnimatedElementsRequest } from './get-all-animated-elements-request';
import { IFAnimationItem } from '../i-f-animation-item';
import { IFElementToAnimate } from '../i-f-element-to-animate';

export class GetAllAnimatedElementsHandler {

  private allNodes: HTMLElement[] = [];
  private allConnections: HTMLElement[] = [];

  constructor(
      private document: Document,
  ) {
  }

  public handle(request: GetAllAnimatedElementsRequest): IFElementToAnimate[][] {

    if (!request.flowId) {
      throw new Error('Flow id is required');
    }

    const flowElement: HTMLElement = this.getFlowElement(request.flowId);

    this.allNodes = this.getAllNodes(flowElement);

    this.allConnections = this.getAllConnections(flowElement);

    const result = request.items.map((row: IFAnimationItem[]) => {
      return row.map((item: IFAnimationItem) => {
        return {
          element: item.isConnection ? this.getConnectionElement(item.id) : this.getNodeElement(item.id),
          duration: item.duration
        } as IFElementToAnimate;
      })
    });

    return result;
  }


  private getAllNodes(flowElement: HTMLElement): HTMLElement[] {
    const result = Array.from(flowElement.getElementsByTagName('f-node')) as HTMLElement[];
    return result;
  }

  private getAllConnections(flowElement: HTMLElement): HTMLElement[] {
    const result = Array.from(flowElement.getElementsByTagName('f-connection')) as HTMLElement[];
    return result;
  }

  private getFlowElement(flowId: any): HTMLElement {
    const flowElement: HTMLElement | null = this.document.getElementById(flowId);
    if (!flowElement) {
      throw new Error(`FFlowComponent with id ${ flowId } not found`);
    }
    return flowElement;
  }

  private getNodeElement(nodeId: any): HTMLElement {
    const nodeElement: HTMLElement | undefined = this.allNodes.find((node: HTMLElement) => node.id === nodeId);
    if (!nodeElement) {
      throw new Error(`FNodeComponent with id ${ nodeId } not found`);
    }
    return nodeElement;
  }

  private getConnectionElement(connectionId: any): SVGPathElement {
    const connectionElement: HTMLElement | undefined = this.allConnections.find((connection: HTMLElement) => connection.id === connectionId);
    if (!connectionElement) {
      throw new Error(`FConnectionComponent with id ${ connectionId } not found`);
    }

    const paths = connectionElement.getElementsByTagName('path');

    const length = paths.length;
    if (length < 2) {
      throw new Error(`FConnectionComponent with id ${ connectionId } has no path element`);
    }

    return paths[ 1 ];
  }
}
