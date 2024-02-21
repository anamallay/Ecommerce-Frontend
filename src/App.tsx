import { ToasterProvider } from "./contexts/ToasterProvider";
import Index from "./router/Router";
function App() {
  return (
    <>
      <ToasterProvider>
        <Index />
      </ToasterProvider>
    </>
  );
}

export default App;
