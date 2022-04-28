import React from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import './index.css';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
