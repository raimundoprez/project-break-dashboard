import {createDashboardElement} from "./base.js";
import {setup} from "./weather.js";

createDashboardElement(setup, null, ["centered-panel"], document.querySelector("main"));