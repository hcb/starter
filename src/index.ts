
import express, { Request, Response } from 'express';
import { create } from 'browser-sync';
import path from 'path';

import { IS_PROD, NODE_ENV } from './config/config';

const app = express();

// replaces bodyParser, which is deprecated in express 4.17.x
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.set("view engine", "ejs");
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

const PORT = 3000
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);

    // livereload
    if (!IS_PROD) {
    const bsServer = create();
        bsServer.init({
            // https://browsersync.io/docs/options#option-proxy
            // Use to proxy the existing express server on 3000
            proxy: `http://localhost:${PORT}`,
            // https://browsersync.io/docs/options#option-files
            files: ["src/public/**/*.css"],
            // do not open a browser on start
            open: false
        })
    }
});

app.get("/", (req: Request, res: Response) => {
    console.log('Rendering index view');
    console.log(`Node environment: ${NODE_ENV}`)
    res.render('index', { root: viewsDir, isDev: !IS_PROD });

})

