import {NetworkBehavior} from "./networkBehavior";

export interface Network {
  
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
  
  emit (event: string, data: any);
  
  /**
   * Send a Behavior's data from client to server or from server to client.
   */
  emitBehaviorProperties (networkId: string, properties: any);
}