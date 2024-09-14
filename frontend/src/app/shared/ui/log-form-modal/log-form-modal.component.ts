import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { OptionsComponent } from '../options/options.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Log } from '../../../domain/models/log';
import { DatePipe } from '@angular/common';

export type ModalMode = "create" | "edit" | "duplicate";
export interface SubmitEvent {
	mode: ModalMode,
	log: Log
}

@Component({
	selector: 'app-log-form-modal',
	standalone: true,
	imports: [InputComponent, ButtonComponent, OptionsComponent, IconButtonComponent, ReactiveFormsModule, DatePipe],
	templateUrl: './log-form-modal.component.html',
	styles: ``
})
export class LogFormModalComponent implements OnInit {

	constructor(private fb: FormBuilder) { }

	readonly severityOptions = ["info", "warning", "error"];
	readonly typeOptions = ["api", "manual_event_form"];

	public form!: FormGroup;

	@Input({ required: true }) public modalMode: ModalMode = "create";
	@Input() public log?: Log;

	@Output() public close = new EventEmitter();
	@Output() public submit = new EventEmitter<SubmitEvent>();

	public title!: string;

	readonly titleMap: Record<ModalMode, string> = {
		"create": "Create new log",
		"duplicate": "Create new log",
		"edit": "Edit Log",
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			id: this.fb.control(""),
			description: this.fb.control(""),
			type: this.fb.control(""),
			severity: this.fb.control(""),
			createdAt: this.fb.control(""),
		});

		this.title = this.titleMap[this.modalMode];
		if (this.log) this.prepare(this.log, this.modalMode);
	}

	private prepare(log: Log, mode: ModalMode) {
		const date = new DatePipe("en-US").transform(log.createdAt, "yyyy-MM-dd");
		switch (mode) {
			case "create":
				this.form.reset();
				this.form.patchValue({
					type: "manual_event_form",
				});
				break;
			case "edit":
				this.form.get("id")?.disable();
				this.form.get("createdAt")?.disable();
				this.form.get("type")?.disable();

				this.form.patchValue({ ...log, createdAt: date });
				break;
			case "duplicate":
				this.form.patchValue({
					id: "",
					createdAt: "",
				});
				this.form.patchValue({ ...log, createdAt: date });
				break;
		}
	}

	onFormSubmit() {
		const log = this.log ? { ...this.log, ...this.form.value } : this.form.value;
		this.submit.emit({ mode: this.modalMode, log });
		this.onModalClose();
	}

	onModalClose() {
		this.close.emit();
	}
}
