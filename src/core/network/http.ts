import {ConductService} from "../service/conductService";
import {RegisterService} from "../injection/metaDecorators";

@RegisterService()
export class Http extends ConductService {
  
  private defaultRequestHeader = { key: 'Content-Type', value: 'application/json;charset=UTF-8' };
  
  public get (url: string, callback?: Function) {
    return this.makeRequest('GET', url, null, callback);
  }
  
  public post (url: string, requestBody: any, callback?: Function) {
    return this.makeRequest('POST', url, requestBody, callback);
  }
  
  public del (url: string, callback?: Function) {
    return this.makeRequest('DELETE', url, null, callback);
  }
  
  public makeRequest (method: string, url: string, requestBody: any, callback?: Function) {
    let xmlHttp = new XMLHttpRequest();
    let async = !!callback;
    
    if (async) {
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
      };
    }
    
    xmlHttp.setRequestHeader(this.defaultRequestHeader.key, this.defaultRequestHeader.value);
    xmlHttp.open(method, url, async);
    xmlHttp.send(JSON.stringify(requestBody || {}));
  }
}