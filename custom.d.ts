/* eslint-disable import/prefer-default-export */
declare module "*.svg" {
  import type * as React from "react";

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
}
