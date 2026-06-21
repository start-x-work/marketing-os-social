import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AccountAudit } from "./routes/AccountAudit";
import { CalendarAnalyze } from "./routes/CalendarAnalyze";
import { Home } from "./routes/Home";
import { PostEvaluate } from "./routes/PostEvaluate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "post", element: <PostEvaluate /> },
      { path: "calendar", element: <CalendarAnalyze /> },
      { path: "account", element: <AccountAudit /> },
    ],
  },
]);
