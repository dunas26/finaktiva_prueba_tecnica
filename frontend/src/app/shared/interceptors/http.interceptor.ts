import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
	const URL = `${environment.BASE_URL}/${environment.API_VERSION}`;
	const originalUrl = req.url.replace("$", URL);
	return next(req.clone({ url: originalUrl }));
};
