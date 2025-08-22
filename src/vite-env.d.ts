/// <reference types="vite/client" />

import * as React from 'react';

declare module "*.svg" {
  const src: string;
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
  export { ReactComponent };
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}