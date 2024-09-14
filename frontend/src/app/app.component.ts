import { HttpClient, withFetch } from "@angular/common/http";
import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/ui/button/button.component';
import { ColorThemeService } from "./shared/services/color-theme.service";
import { IconButtonComponent } from "./shared/ui/icon-button/icon-button.component";
import { InputComponent } from "./shared/ui/input/input.component";
import { OptionsComponent } from "./shared/ui/options/options.component";
import * as rx from "rxjs";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
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
export class AppComponent implements AfterViewInit {
	constructor(private colorThemeService: ColorThemeService, private logService: LogService) { }
	title = 'log-management';

	public themes$: rx.Observable<string[]> = rx.of([]);
	public themeFormControl = new FormControl();

	public logs$: rx.Observable<Log[]> = rx.of([]);

	public modalMode: ModalMode = "create";
	public modalLog?: Log;
	public isModalOpen = false;

	ngAfterViewInit(): void {
		this.colorThemeService.loadTheme("blossom");
		this.themeFormControl.setValue("blossom");
		this.themes$ = this.colorThemeService.getAvailableThemes();
		this.themeFormControl.valueChanges.subscribe((theme) => {
			this.colorThemeService.loadTheme(theme);
		})

		this.updateLogs();
	}

	updateLogs() {
		this.logs$ = this.logService.getAllLogs();
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
		console.log({ log, mode });

		switch (mode) {
			case "create":
			case "edit":
				this.logService.saveLog(log).subscribe(
					{ next: () => this.updateLogs() }
				)
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
}
