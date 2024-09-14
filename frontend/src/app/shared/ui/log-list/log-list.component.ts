import { Component, Input } from '@angular/core';
import { Log } from '../../../domain/models/log';
import { LogListItemComponent } from '../log-list-item/log-list-item.component';

@Component({
	selector: 'app-log-list',
	standalone: true,
	imports: [LogListItemComponent],
	templateUrl: './log-list.component.html',
	styles: ``
})
export class LogListComponent {
	public viewType = "list";
	@Input() public logs: Log[] = [];

	onLogOptionSelected(log: Log, option: string) {
		console.log({ log, option })
	}
}
