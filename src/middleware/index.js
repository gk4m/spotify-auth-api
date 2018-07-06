import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export default function (app, express) {

    app.use(express.static('public'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(cookieParser());

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
        res.header('Access-Control-Allow-Headers', "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json, x-access-token");
        next();
    });
};

