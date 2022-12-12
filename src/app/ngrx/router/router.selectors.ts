import { createSelector } from '@ngrx/store';
import { IAppRouterState } from 'src/app/models/router.models';
import { IAppState } from 'src/app/models/state.models';

export const selectFeature = (state: IAppState) => state.router;

export const selectRouteParams = createSelector(
  selectFeature,
  (routerState: IAppRouterState) => routerState.state.params
);
