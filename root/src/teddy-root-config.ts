import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import "./global/styles.css";

const updateCookies = async () => {
  // Exemplo de como definir um cookie (usando document.cookie)
  const date = new Date();
  document.cookie = `last_visit=${date.toISOString()}`;
};

// Adiciona o listener para o evento de navegação do single-spa
window.addEventListener("single-spa:routing-event", updateCookies);

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
