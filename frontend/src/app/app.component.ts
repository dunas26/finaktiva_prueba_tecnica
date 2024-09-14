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
import { LogListComponent } from "./shared/ui/log-list/log-list.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ButtonComponent, IconButtonComponent, InputComponent, OptionsComponent, AsyncPipe, ReactiveFormsModule, JsonPipe, LogListComponent],
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

	ngAfterViewInit(): void {
		this.colorThemeService.loadTheme("blossom");
		this.themeFormControl.setValue("blossom");
		this.themes$ = this.colorThemeService.getAvailableThemes();
		this.themeFormControl.valueChanges.subscribe((theme) => {
			this.colorThemeService.loadTheme(theme);
		})

		this.logs$ = this.logService.getAllLogs();
	}

	changeTheme(theme: string): void {
		this.colorThemeService.loadTheme(theme);
	}
}
