import { App, csrf, staticFiles } from 'fresh';
import { type State } from './utils.ts';

export const app = new App<State>();

app.use(staticFiles(), csrf());

// Include file-system based routes here
app.fsRoutes();
