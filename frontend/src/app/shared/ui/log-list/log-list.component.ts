import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../../../domain/models/log';
import { LogListItemComponent, LogOption } from '../log-list-item/log-list-item.component';

export interface OptionEvent {
	log: Log;
	option: LogOption;
}
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
	@Output() public optionSelected = new EventEmitter<OptionEvent>();

	onLogOptionSelected(log: Log, option: LogOption) {
		this.optionSelected.emit({ log, option })
	}
}
