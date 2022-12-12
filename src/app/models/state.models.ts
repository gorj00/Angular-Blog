import { ITagsState } from "./blog.models";
import { IAppRouterState } from "./router.models";

export interface IAppState {
  router: IAppRouterState,
  tags?: ITagsState
}
