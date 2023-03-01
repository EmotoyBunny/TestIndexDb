import { createBrowserHistory } from 'history';
import config from 'config';


let buildMode = config.buildMode;
let baseName = config['baseName' + buildMode];
export const history = createBrowserHistory({ basename: baseName });

history.pushForce = (path) => {
	history.push("/empty");
	setTimeout(function () {
		history.replace(path);
	});
};