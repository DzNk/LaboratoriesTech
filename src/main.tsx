import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import {RootPage} from "./pages/RootPage";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider>
            <RootPage/>
        </MantineProvider>
    </React.StrictMode>,
)
