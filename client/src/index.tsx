import React from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

import './index.css';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
