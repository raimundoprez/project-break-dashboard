import {createDashboardElement} from "./base.js";
import {setup} from "./links.js";

createDashboardElement(setup, ["centered-panel"], document.querySelector("main"));