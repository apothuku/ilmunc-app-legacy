ILMUNC-App
==========
## Technology Stack
* [Ionic](http://www.ionicframework.com) is the framework with which we are programming and deploying to both Android and iOS. HTML, CSS, and Javascript are used in the development.
* [AngularJS](http://angularjs.org/) is how the back-end Javascript is organized.
* [Parse](http://www.parse.com) handles the database and database calls, as well as Push notifications.
* [Sass](http://www.sass-lang.com) organizes the CSS and visual elements.

## Getting Started with the Development Environment

### Setting up Ionic
Follow directions [here](http://www.ionicframework.com/getting-started/) to install the command line interface.

Add the Android and iOS platforms with the following commands:

```
ionic platform add android
ionic platform add ios
```

Add the following plugins with these commands:

```
cordova plugin add cordova-plugin-inappbrowser
```

### Running the Project
To run the project on your browser, enter the following command in the project:

```ionic serve```

and, when prompted, choose option 1.

To run the project on an iOS emulator (only on Mac), type this:

```ionic emulate ios```

To run the project on a physical iOS or Android device, make sure that the device is plugged in and recognized by the computer, then run:

```ionic run ios``` or ```ionic run android```
