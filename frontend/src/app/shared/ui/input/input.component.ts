import { NgClass } from '@angular/common';
import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [ReactiveFormsModule, NgClass],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		}
	],
	templateUrl: './input.component.html',
	styles: ``,
	host: {
		'(blur)': 'onTouched()',
		'(change)': 'onChange($event.target.value)'
	}
})
export class InputComponent implements ControlValueAccessor {

	public formValue: FormControl = new FormControl();

	private onChange: any;
	private onTouched: any;
	public disabled = false;
	public labelClasses: string = "";

	@Input({ required: true }) public label: string = "";
	@Input({ required: false }) public type: string = "";
	@ViewChild('valueInput') public valueInput!: ElementRef<HTMLInputElement>;

	writeValue(value: string): void {
		this.formValue.setValue(value);
		if (this.onChange)
			this.onChange(value);
	}

	onLabelClick(): void {
		if (!this.valueInput) return;
		this.valueInput.nativeElement.focus();
		if (this.onTouched) this.onTouched();
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	onInputFocus(): void {
		this.labelClasses = "underline";
	}

	onInputBlur(): void {
		this.labelClasses = "";
	}
}
