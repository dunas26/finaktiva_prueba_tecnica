import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [ReactiveFormsModule],
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

	@Input({ required: true }) public label: string = "";
	@Input({ required: false }) public type: string = "";
	@ViewChild('valueInput') public valueInput!: ElementRef<HTMLInputElement>;

	writeValue(value: string): void {
		this.formValue.get
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
		throw new Error('Method not implemented.');
	}



}
