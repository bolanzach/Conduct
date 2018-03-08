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
  
  emit (message: string, data: any);
  
  /**
   * Send a Behavior's data from client to server or from server to client.
   * @param {string} networkId - NetworkBehavior's id
   * @param {string} prop -
   * @param {string} value
   */
  emitProperty (networkId: string, prop: string, value: string);
}