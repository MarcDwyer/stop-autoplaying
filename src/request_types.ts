export enum RequestTypes {
  blacklist = "blacklist",
}

export type IsBlacklisted = {
  type: string;
  url: string;
};
