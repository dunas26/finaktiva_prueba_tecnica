import { NgClass } from '@angular/common';
import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-options',
	standalone: true,
	imports: [NgClass],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => OptionsComponent),
		multi: true,
	}],
	templateUrl: './options.component.html',
	styles: ``
})
export class OptionsComponent implements ControlValueAccessor {

	@Input({ required: true }) public label: string = "";
	@Input({ required: true }) public options: string[] = [];

	private onChange = (option: string) => { };
	private onTouched = () => { };

	public disabled = false;
	public labelClasses: string = "";
	public selectedOption?: string;
	public open = false;
	public justClicked = false;

	@ViewChild('container') private container!: ElementRef<HTMLElement>;

	onOptionsClick() {
		if (this.onTouched) this.onTouched();
		setTimeout(() => this.justClicked = false, 200);
		if (this.justClicked) return;
		this.justClicked = true;
		if (!this.container?.nativeElement) return;
		this.container.nativeElement.focus();
		this.open = !this.open;
		console.log({ focused: document.activeElement })
	}
	handleBlur(event: FocusEvent) {
		const currentTarget = event.currentTarget as HTMLElement;
		const relatedTarget = event.relatedTarget as HTMLElement;
		if (!currentTarget) return;
		if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
			event.stopPropagation();
			event.preventDefault();
			this.open = false;
			return;
		}
		this.open = true;
	}

	writeValue(option: string): void {
		if (this.onChange) this.onChange(option);
		this.selectedOption = option;
	}
	registerOnChange(fn: (opt: string) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

}
