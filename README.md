# Satellite Application
This application displays satellite positions in real-time.

## Local Development

### Running the Application
1. `npm install`
2. Add environment variables to `.env.local` file. Required variables are:
  - `NEXT_PUBLIC_CESIUM_ACCESS_TOKEN` - [Cesium access token](https://cesium.com/platform/cesium-ion/)
3. `npm run dev`

### Mobile Application with Capacitor
This application uses Capacitor to build and run the application on iOS and Android devices. To run the application on a device, follow the steps below.

1. Build the Next.js app with `npm build`
2. If you don't already have the `ios/` or `android/` directory, generate it with `npx cap add ios` or `npx cap add android`.
4. Sync the build with the iOS/Android app with `npx cap sync`
5. Open the iOS app in Xcode/Android Studio with `npx cap open ios` or `npx cap open android` and run the app in the simulator or connect your device and run the app on your device.