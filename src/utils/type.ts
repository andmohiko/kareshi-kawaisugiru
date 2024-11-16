export const isDefined = <T>(arg: T | undefined): arg is T => {
  return typeof arg !== "undefined";
};
