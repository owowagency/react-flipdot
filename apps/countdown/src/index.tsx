import ReactFlipdot from '@owowagency/react-flipdot';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './Error';
import App from './App';

let mode: 'tty' | 'flipdot' = 'tty';

for (const arg of process.argv) {
    const pattern = /--mode=(?<mode>tty|flipdot)/;
    const match = arg.trim().match(pattern);
    if (match && (match.groups['mode'] === 'tty' || match.groups['mode'] === 'flipdot')) {
        mode = match.groups['mode'];
    }
}

ReactFlipdot.render(
    <ErrorBoundary fallback={<Error />}>
        <App />
    </ErrorBoundary>, 
    { mode, debug: false }
);

