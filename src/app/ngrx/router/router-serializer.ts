import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { IRouterState } from 'src/app/models/router.models';

export class RouterSerializer implements RouterStateSerializer<IRouterState> {
  serialize(routerState: RouterStateSnapshot): IRouterState {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;
    return { url, params, queryParams };
  }
}
