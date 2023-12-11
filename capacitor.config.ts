import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.app.fitnessApp',
  appName: 'fitnessApp',
  webDir: 'www',
  bundledWebRuntime: false,
	plugins: {
    CapacitorHttp: {
      enabled: true
    },
		SplashScreen: {
			launchShowDuration: 0
		}
	}
};

export default config;

