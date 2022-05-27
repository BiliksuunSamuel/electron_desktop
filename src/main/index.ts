import { app, BrowserWindow } from "electron";
import * as SplashScreen from "@trodi/electron-splashscreen";
import colors from "../renderer/App/constants/colors";
const path = require("path");
let mainWindow: BrowserWindow;
const isDev: boolean = process.env.ELECTRON_ENV == "dev";

const mainOpts: Electron.BrowserWindowConstructorOptions = {
  width: 1100,
  height: 750,
  minWidth: 900,
  minHeight: 600,
  autoHideMenuBar: true,
  center: true,
  webPreferences: {
    nodeIntegration: true,
    devTools: isDev,
    webSecurity: process.env.NODE_ENV !== "development",
  },
  icon: path.join(__dirname, "/icons/logo.ico"),
  title: "Feed Konzept",
  titleBarStyle: "customButtonsOnHover",
};
const config: SplashScreen.Config = {
  windowOpts: mainOpts,
  templateUrl: path.join(__dirname, "/icons/splash.html"),

  splashScreenOpts: {
    width: 250,
    height: 250,
    backgroundColor: colors._076585,
    autoHideMenuBar: true,
    resizable: false,
  },
};
//Render main window w/ configuration settings
const renderWindow = async () => {
  mainWindow = SplashScreen.initSplashScreen(config);

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000/");
  } else {
    mainWindow.loadFile("./build/index.html");
  }

  // Detect if devtools was somehow opened outside development
  mainWindow.webContents.on("devtools-opened", () => {
    if (!isDev) {
      mainWindow.webContents.closeDevTools();
    }
  });
};

app.on("ready", renderWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    renderWindow();
  }
});
