import {createDashboardElement} from "./base.js";
import {setup} from "./clock.js";

createDashboardElement(setup, ["centered-panel"], document.querySelector("main"));