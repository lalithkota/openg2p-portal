export function prefixBasePath(path: string) {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "") + path;
}

export function prefixBaseApiPath(path: string) {
  return (process.env.NEXT_PUBLIC_BASE_API_PATH || "") + path;
}

export function removePrefixBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_API_PATH || "";
  return path.replace(basePath, "/");
}
