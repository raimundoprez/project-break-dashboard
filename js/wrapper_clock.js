import {createDashboardElement} from "./base.js";
import {setup} from "./clock.js";

createDashboardElement(setup, null, ["centered-panel"], document.querySelector("main"));