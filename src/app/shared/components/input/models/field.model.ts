/**
 * @name Field
 * @description This interface provides a model for Input Field
 *
 * @author Start2Play
 */

export interface Field {
    //Field Configuration
    type: string;
    label?: string;
    placeholder?: string;
    labelLink?: { text: string; url: string };

    //Mask Configuration
    mask?: string;
    dropMask?: boolean;

    //Validation Errors Configuration
    errors?: { [key: string]: string };

    //Select Options Configuration
    options?: Array<{ key: string; value: any }>;
}
