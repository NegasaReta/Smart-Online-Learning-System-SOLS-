import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppClerkProvider } from "./app/providers/ClerkProvider";
import { AppRouter } from "./app/router";
import { I18nProvider } from "./i18n/I18nProvider";
import {
  applyPreferences,
  getPreferences,
} from "./features/student/settings/preferencesStore";
import "./styles/globals.css";
import "./index.css";

// Apply persisted preferences (theme, font-size, high-contrast) before render.
applyPreferences(getPreferences());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <AppClerkProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppClerkProvider>
    </I18nProvider>
  </React.StrictMode>
);
