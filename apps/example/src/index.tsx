import ReactFlipdot from '@owowagency/react-flipdot';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './Error';
import App from './App';


ReactFlipdot.render(
    <ErrorBoundary fallback={<Error />}>
        <App />
    </ErrorBoundary>, 
    { mode: 'tty', debug: false }
);

