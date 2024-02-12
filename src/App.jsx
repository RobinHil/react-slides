import Toolbar from './components/Toolbar/Toolbar.jsx';
import { SlidesCountProvider } from './contexts/SlidesCount.context.jsx';

function App() {
    return (
        <SlidesCountProvider maxSlide={9}>
            <Toolbar />
        </SlidesCountProvider>
    );
}

export default App;
