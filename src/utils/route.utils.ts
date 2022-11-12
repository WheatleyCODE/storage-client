import { PathRoutes } from 'types';

export const checkPathnameOnPathRoute = (pathname: string, pathRoute: PathRoutes): boolean => {
  const curPath = pathname.split('/');
  curPath.pop();
  const currentPath = `${curPath.join('/')}/`;

  const route = pathRoute.split(':');
  route.pop();
  const currentPathRoute = route.join('');

  return currentPath === currentPathRoute;
};
