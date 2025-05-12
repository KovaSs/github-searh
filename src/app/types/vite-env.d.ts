/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare const __GITHUB_ACCESS_TOKEN__: string;
declare const __GITHUB_API_URL__: string;
declare const __IS_DEV__: boolean;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
