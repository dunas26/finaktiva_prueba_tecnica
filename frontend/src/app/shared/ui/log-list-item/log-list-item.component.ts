import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../../../domain/models/log';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-log-list-item',
	standalone: true,
	imports: [DatePipe],
	templateUrl: './log-list-item.component.html',
	styles: ``
})
export class LogListItemComponent {
	@Input({ required: true }) public log!: Log;
	@Output() optionSelected = new EventEmitter<string>();

	public optionsOpened = false;

	readonly optionsItems: string[] = [
		"edit",
		"duplicate",
		"delete"
	];

	onOptionsBlur(event: FocusEvent) {
		const currentTarget = event.currentTarget as HTMLElement;
		const relatedTarget = event.relatedTarget as HTMLElement;
		if (!currentTarget) return;
		if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
			event.stopPropagation();
			event.preventDefault();
			this.optionsOpened = false;
			return;
		}
		this.optionsOpened = true;
	}

	onOptionSelect(option: string) {
		this.optionSelected.emit(option);
	}

	onOptionsToggle() {
		this.optionsOpened = !this.optionsOpened;
	}
}
