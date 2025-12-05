import {createDashboardElement} from "./base.js";
import {setup} from "./passwords.js";

createDashboardElement(setup, null, ["centered-panel"], document.querySelector("main"));