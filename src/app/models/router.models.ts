import { Params } from '@angular/router';

export interface IRouterState {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface IAppRouterState {
  navigationId: number;
  state: IRouterState
}

export interface IRouterNavigationAction {
  type: string;
  payload: {
    event: any;
    routerState: IRouterState
  }
}
