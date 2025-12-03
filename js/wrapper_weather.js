import {createDashboardElement} from "./base.js";
import {setup} from "./weather.js";

createDashboardElement(setup, ["centered-panel"], document.body);