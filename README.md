# @foblex/flow-animator

Animation library for @foblex/flow, designed to provide smooth and customizable animations for your Angular projects.

## Features

- Seamless integration with Angular applications.
- Customizable animation sequences.
- Supports both HTML and SVG animations.

## Installation

To install the package, run:

```bash
npm install @foblex/flow-animator
```

## Usage

Here's a basic example of how to use @foblex/flow-animator:

```typescript
// In your component
constructor(private fFlowAnimator: FFlowAnimatorService) {}

animateFlow() {
  this.fFlowAnimator.animate('f-flow-0', {
    items: [
      [ { id: 'element1' } ],
      // ...other items...
    ],
    duration: 14000,
    removeOverlayAfterRowComplete: true
  }).subscribe((result) => {
    // Handle animation result
  });
}
```
