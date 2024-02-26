import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ToasterProvider } from "./contexts/ToasterProvider";
import Index from "./router/Router";
function App() {
    return (_jsx(_Fragment, { children: _jsx(ToasterProvider, { children: _jsx(Index, {}) }) }));
}
export default App;
