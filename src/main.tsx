import { createRoot } from 'react-dom/client'
import './index.css'
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {StrictMode} from "react";
import {AppWrapper} from "./components/common/PageMeta.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <AppWrapper>
                <Provider store={store}>
                    <App />
                </Provider>,
            </AppWrapper>
        </ThemeProvider>
    </StrictMode>,
)
