const endpoint = (
  feature: string,
  method: string,
  route: string,
): { endpoint: string; url: string } => ({
  endpoint: `${feature} ${method} ${route}`,
  url: route,
});

export default endpoint;
