import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  async logCurrentNetworkStatus() {
    const status = await Network.getStatus();

    console.log('Network status:', status);
  };
}
