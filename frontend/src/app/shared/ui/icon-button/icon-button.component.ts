import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-icon-button',
	standalone: true,
	imports: [NgClass],
	templateUrl: './icon-button.component.html',
	styles: ``
})
export class IconButtonComponent {
	@Input({ required: true }) public icon: string = "";
}
