import {NetworkBehavior} from "./networkBehavior";

export interface Network {
  register (behavior: NetworkBehavior);
  deregister (behavior: NetworkBehavior);
  emit (message: string, data: any);
}