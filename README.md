# Mobile-project
On tämä saatana työmaa

React Native CLI setup errors and fixes

expo:compileDebugKotlin FAILED
Add: classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.10" to android/build.gradle under dependencies

app:generatePackageList
Install: npm i @react-native-community/cli-platform-android

Something about AAR metadata file and long path to aar-metadata.properties:
Go to that file and change minCompileSdk to 30

Cannot read properties of undefined (reading 'transformFile')
Downgrade node.js to v16.x (I'm using 16.13)

gradlew.bat app:installDebug -PreactNativeDevServerPort=8081
Go to android/gradle\wrapper/grade-wrapper.properties and change distributionUrl to: distributionUrl=https\://services.gradle.org/distributions/gradle-7.2-bin.zip

Unable to start daemon process
Open android/gradle.properties and add to the end of the file: org.gradle.jvmargs=-Xmx1024m

Execution failed for task ':app:processDebugMainManifest'
Open android/gradle.properties and add to the end of the file: org.gradle.jvmargs=--add-opens java.base/java.io=ALL-UNNAMED