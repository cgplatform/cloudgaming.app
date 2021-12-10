import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { Field } from "./models/field.model";

@Component({
    selector: "s2p-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
    @Input()
    public field!: Field;

    @Input()
    public control!: FormControl;

    @Input()
    public prefix!: any;

    @Input()
    public postfix!: any;

    constructor() {}

    ngOnInit(): void {}

    public onClick(event: any): void {
        if (!event) {
            return;
        }

        const pointEvent = event as PointerEvent;
        const wrapper = pointEvent.target as HTMLElement;

        const inputs = wrapper.getElementsByTagName("input");
        const input = inputs[0];

        console.log(inputs);


        if (input) {
            input.focus();
        }
    }

    public get required(): boolean {
        if (this.control.validator) {
            const validator = this.control.validator({} as AbstractControl)!;
            if (validator && validator["required"]) {
                return true;
            }
        }

        return false;
    }

    public get wrapperClasses(): Array<string> {
        const classes = new Array<string>();

        if (this.control == null) {
            return [];
        }

        if (this.control.invalid) {
            classes.push("ng-invalid");
        }

        if (this.control.touched) {
            classes.push("ng-touched");
        }

        if (this.control.disabled) {
            classes.push("ng-disabled");
        }

        return classes;
    }

    public get mask(): string {
        const mask = this.field.mask;
        return mask ? mask : "";
    }

    public get canDrop(): boolean {
        const canDrop = this.field.dropMask;
        return canDrop === undefined ? true : canDrop;
    }

    public get placeholder(): string {
        const placeholder = this.field.placeholder;
        return placeholder ? placeholder : "";
    }

    public get selectClasses(): Array<string> {
        const classes = new Array<string>();

        if (this.control.value === "") {
            classes.push("default-value");
        }

        return classes;
    }
}
