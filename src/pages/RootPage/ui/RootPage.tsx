import {AppShell} from "@mantine/core";
import {Navbar} from "components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "pages/HomePage";
import {CalculatorPage} from "pages/CalculatorPage";
import {StopWatchPage} from "pages/StopWatch";
import {WordMakerPage} from "pages/WordMakerPage";
import {SetsPage} from "pages/SetsPage";

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
                            <Route path="/lab2" element={<StopWatchPage/>}/>
                            <Route path="/lab3" element={<WordMakerPage/>}/>
                            <Route path="/lab4" element={<SetsPage/>}/>
                        </Routes>
                    </AppShell.Main>
                </AppShell>
            </BrowserRouter>
        </>
    );
}