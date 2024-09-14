import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as rx from "rxjs";
import { Log } from '../../domain/models/log';
import { ResponseType } from '../../domain/types';

@Injectable({
	providedIn: 'root'
})
export class LogService {

	constructor(private http: HttpClient) { }

	getAllLogs(): rx.Observable<Log[]> {
		return this.http.get<ResponseType<Log[]>>("$/logs").pipe(rx.map((res) => {
			return res.data
		}));
	}

	deleteById(id: string): rx.Observable<void> {
		return this.http.delete<void>(`$/logs/${id}`);
	}
}
