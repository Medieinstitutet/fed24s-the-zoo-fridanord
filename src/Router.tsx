import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { AnimalsOverview } from "./pages/AnimalsOverview";
import { AnimalDetails } from "./pages/AnimalDetails";
import { ErrorPage } from "./pages/ErrorPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "animals",
                element: <AnimalsOverview />,
            },
            {
                path: "animals/:id",
                element: <AnimalDetails />,

            },
        ],
    },
]);
