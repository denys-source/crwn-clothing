import { UnknownAction } from "redux";

export type Matchable<AC extends () => UnknownAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: UnknownAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => UnknownAction>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...extraArgs: any[]) => UnknownAction>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: UnknownAction) {
      return type === action.type;
    }
  })
}


export type Action<T> = {
  type: T;
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
}

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload }
}
