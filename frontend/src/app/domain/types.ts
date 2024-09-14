export interface ResponseType<T> {
	data: T;
	success: boolean;
	statusCode: number;
	message: string;
	timestamp: Date;
}
