import {NetworkBehavior} from "./networkBehavior";
import {Service} from "../service/service";

export interface Network extends Service {
  
  /**
   * Register a NetworkBehavior to the Network
   * @param {NetworkBehavior} behavior
   */
  register (behavior: NetworkBehavior);
  
  /**
   * Deregister a NetworkBehavior from the Network
   * @param {NetworkBehavior} behavior
   */
  deregister (behavior: NetworkBehavior);
  
  /**
   * Sends websocket message
   * @param {string} event
   * @param data
   */
  emit (event: string, data: any);
}