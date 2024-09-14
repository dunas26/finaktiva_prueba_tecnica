import { HttpClient, withFetch } from "@angular/common/http";
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/ui/button/button.component';
import { ColorThemeService } from "./shared/services/color-theme.service";
import { IconButtonComponent } from "./shared/ui/icon-button/icon-button.component";
import { InputComponent } from "./shared/ui/input/input.component";
import { OptionsComponent } from "./shared/ui/options/options.component";
import * as rx from "rxjs";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Log } from "./domain/models/log";
import { LogService } from "./shared/services/log.service";
import { LogListComponent, OptionEvent } from "./shared/ui/log-list/log-list.component";
import { LogFormModalComponent, ModalMode, SubmitEvent } from "./shared/ui/log-form-modal/log-form-modal.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ButtonComponent, IconButtonComponent, InputComponent, OptionsComponent, AsyncPipe, ReactiveFormsModule, JsonPipe, LogListComponent, LogFormModalComponent],
	providers: [ColorThemeService],
	templateUrl: './app.component.html',
	styles: [],
})
export class AppComponent implements OnInit, AfterViewInit {
	constructor(private colorThemeService: ColorThemeService, private logService: LogService, private fb: FormBuilder) { }
	title = 'log-management';

	public themes$: rx.Observable<string[]> = rx.of([]);
	public themeFormControl = new FormControl();

	public logs$: rx.Observable<Log[]> = rx.of([]);
	public filteredLogs$: rx.Observable<Log[]> = rx.of([]);

	public modalMode: ModalMode = "create";
	public modalLog?: Log;
	public isModalOpen = false;

	public invalidFilterDate = false;

	public filterForm!: FormGroup;

	readonly typeOptions = ["all", "api", "manual_event_form"];

	ngOnInit(): void {
		this.filterForm = this.fb.group({
			type: this.fb.control(""),
			from: this.fb.control(""),
			to: this.fb.control(""),
		}, {
			validators: (group: FormGroup) => {
				const from = group.get("from");
				const to = group.get("to");

				const dateFrom = new Date(from?.value).getTime();
				const dateTo = new Date(to?.value).getTime();

				if (isNaN(dateFrom) || isNaN(dateTo)) return null;
				const invalidDate = dateFrom > dateTo;
				this.invalidFilterDate = invalidDate;
				console.log(invalidDate);

				return invalidDate ? { invalidDate: "date is invalid" } : null
			}
		});
	}

	ngAfterViewInit(): void {
		this.colorThemeService.loadTheme("finaktiva");
		this.themeFormControl.setValue("finaktiva");
		this.themes$ = this.colorThemeService.getAvailableThemes();
		this.themeFormControl.valueChanges.subscribe((theme) => {
			this.colorThemeService.loadTheme(theme);
		})

		this.updateLogs();

		this.filterForm.valueChanges.subscribe(() => {
			this.filteredLogs$ = this.filter(this.logs$);
		})
	}

	updateLogs() {
		this.logs$ = this.logService.getAllLogs();
		this.filteredLogs$ = this.filter(this.logs$);
	}

	createLog() {
		this.isModalOpen = true;
		this.modalMode = "create";
		this.modalLog = undefined;
	}

	changeTheme(theme: string): void {
		this.colorThemeService.loadTheme(theme);
	}

	closeModal() {
		this.isModalOpen = false;
		this.modalLog = undefined;
		this.modalMode = "create";
	}

	onModalSubmit({ log, mode }: SubmitEvent) {
		switch (mode) {
			case "duplicate":
			case "create":
				this.logService.saveLog(log).subscribe(
					{ next: () => this.updateLogs() }
				);
				break;
			case "edit":
				this.logService.updateLogById(log.id, log).subscribe({
					next: () => this.updateLogs()
				});
				break;
		}
	}

	openModal({ log, option }: OptionEvent) {
		if (option == "delete") {
			this.logService.deleteById(log.id).subscribe(
				{ next: () => this.updateLogs() }
			);
			return;
		}

		this.modalLog = log;
		this.modalMode = option;
		this.isModalOpen = true;
	}

	private filter(logs: rx.Observable<Log[]>): rx.Observable<Log[]> {
		return logs.pipe(rx.map((logs) => {
			const type = this.filterForm.get("type")?.value;
			if (!type || type == "all") return logs;
			return logs.filter((log) => log.type == type);
		}), rx.map((logs) => {
			const from = this.filterForm.get("from")?.value;
			const to = this.filterForm.get("to")?.value;

			const dateFrom = new Date(from).getTime();
			const dateTo = new Date(to).getTime();

			if (isNaN(dateFrom) || isNaN(dateTo)) return logs;

			return logs.filter((log) => {
				const logDate = new Date(log.createdAt).getTime();
				return logDate >= dateFrom && logDate <= dateTo
			})
		}));
	}
}
