import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/andara-ionic-v1.css";

console.log("[main.tsx] Module evaluation");
const root = createRoot(document.getElementById("root")!);
root.render(
  <App />
);

// Preserve navigation state during HMR (Hot Module Replacement)
if (import.meta.hot) {
  import.meta.hot.accept();
}
