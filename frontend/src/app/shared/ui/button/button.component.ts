import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

type ButtonStyle = "primary" | "secondary";

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [NgClass],
	templateUrl: './button.component.html',
	styles: ``
})
export class ButtonComponent {
		private readonly classMap: { [key: string]: string } = {
			primary: "bg-primary text-quaternary focus:outline-primary",
			secondary: "bg-tertiary text-primary focus:outline-primary"
		};

	@Input({ required: true }) public label: string = "";
	@Input() public loading: boolean = false;
	@Input({ alias: "type" }) public set buttonType (value: ButtonStyle) {
		value = value || "primary";
		this.buttonClasses = this.classMap[value];
	};

	public buttonClasses: string = this.classMap["primary"];
}
