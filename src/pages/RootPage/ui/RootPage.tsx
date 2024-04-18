import {AppShell} from "@mantine/core";
import {Navbar} from "components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "pages/HomePage";
import {CalculatorPage} from "pages/CalculatorPage";

export function RootPage() {
    return (
        <>
            <BrowserRouter>
                <AppShell header={{height: 50}} withBorder={false}>
                    <Navbar/>
                    <AppShell.Main>
                        <Routes>
                            <Route index element={<HomePage/>}/>
                            <Route path="/lab1" element={<CalculatorPage/>}/>
                        </Routes>
                    </AppShell.Main>
                </AppShell>
            </BrowserRouter>
        </>
    );
}