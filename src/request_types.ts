export enum RequestTypes {
  blacklist = "blacklist",
  iconChange = "iconchange",
}

export type BlacklistAction = {
  type: string;
  url: string;
};
export type BlackResponse = {
  type: string;
  isBlacklisted: boolean;
};
export type IconAction = {
  path: string;
  type: string;
};

export enum Attribute {
  listening = "listening",
}
