import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router";
import Home from "./pages/Dashboard/Home.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import NotFound from "./pages/OtherPage/NotFound.tsx";

const App: React.FC = () => {
    console.log("App rendered");

    return (
    <>
        <Router>
            <Routes>
                {/*<Route index element={<UserLayout>}></Route>*/}

                <Route path={"admin"} element={<AdminLayout />}>
                    <Route path="home" element={<Home />}/>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
