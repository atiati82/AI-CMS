import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/andara-ionic-v1.css";
import { VisualEditorProvider } from "./components/ai/VisualEditorProvider";
import { InPageVisualEditor } from "./components/ai/InPageVisualEditor";

const root = createRoot(document.getElementById("root")!);
root.render(
  <VisualEditorProvider>
    <App />
    <InPageVisualEditor />
  </VisualEditorProvider>
);

// Preserve navigation state during HMR (Hot Module Replacement)
if (import.meta.hot) {
  import.meta.hot.accept();
}
