import {createDashboardElement} from "./base.js";
import {setup} from "./links.js";

createDashboardElement(setup, null, ["centered-panel"], document.querySelector("main"));