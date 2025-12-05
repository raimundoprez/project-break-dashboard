import {createDashboardElement} from "./base.js";

import {setup as clock} from "./clock.js";
import {setup as links} from "./links.js";
import {setup as weather} from "./weather.js";
import {setup as passwords} from "./passwords.js";

const main = document.querySelector("main");

createDashboardElement(clock, "db-clock", [], main);
createDashboardElement(links, "db-links", [], main);
createDashboardElement(weather, "db-weather", [], main);
createDashboardElement(passwords, "db-passwords", [], main);