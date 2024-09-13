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

	@Input({ required: true }) public label: string = "";
	@Input() public loading: boolean = false;
	@Input({ alias: "type" }) public set buttonType (value: ButtonStyle) {
		value = value || "primary";
		const classMap: { [key: string]: string } = {
			primary: "bg-primary text-quaternary",
			secondary: "bg-tertiary text-primary"
		};
		this.buttonClasses = classMap[value];
	};

	public buttonClasses: string = "bg-primary text-quaternary";


}
