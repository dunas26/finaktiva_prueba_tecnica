import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ColorThemeService {
	constructor(private http: HttpClient) { }

	private themeContext!: HTMLElement;

	private readonly colorMap: { [key: number]: string } = {
		0: "primary",
		1: "secondary",
		2: "tertiary",
		3: "quaternary",
	}

	loadTheme(theme: string) {
		if (!this.themeContext) this.themeContext = document.getElementById("theme-context")!;

		let style = `:root {`;

		const THEME_URL = `themes/${theme}`;
		this.http.get(THEME_URL, { responseType: "text" }).subscribe((data) => {
			const colors = data.trim().split("\n");
			const limit = Math.min(Object.keys(this.colorMap).length, colors.length);
			for (let i = 0; i < limit; i++) {
				const key = this.colorMap[i];
				style += `--${key}: ${colors[i]};`;
			}

			style += "}";
			this.themeContext.textContent = style;
		});

	}
}
