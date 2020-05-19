import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidationHelper {
    static getErrorMessage(control: AbstractControl) {
        if (control.hasError('notSameMails')) {
            return 'E-Mails müssen übereinstimmen.'
        } else if(control.hasError('notSamePasswords')) {
            return 'Passwörter müssen übereinstimmen.';
        } else if (control.hasError('required')) {
            return 'Das Feld ist ein Pflichtfeld.';
        } else if (control.hasError('email')) {
            return 'Keine gültige E-Mail.';
        } else {
            return '';
        }
    }

    static checkPasswords(group: FormGroup) {
        let pass = group.get('password').value;
        let confirmPass = group.get('passwordConfirmation').value;

        return pass === confirmPass ? null : { notSamePasswords: true }
    }

    static checkEmails(group: FormGroup) {
        let email = group.get('email').value;
        let confirmEmail = group.get('emailConfirmation').value;

        return email === confirmEmail ? null : { notSameMails: true }
    }
}