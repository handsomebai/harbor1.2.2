import { Component, Input, ViewChild } from '@angular/core';
import { CopyInputComponent } from './copy-input.component';
import { InlineAlertComponent } from '../inline-alert/inline-alert.component';

import { PUSH_IMAGE_STYLE } from './push-image.css';
import { PUSH_IMAGE_HTML } from './push-image.html';

@Component({
    selector: 'hbr-push-image-button',
    template: PUSH_IMAGE_HTML,
    styles: [PUSH_IMAGE_STYLE],

    providers: []
})
export class PushImageButtonComponent {
    @Input() registryUrl: string = "unknown";
    @Input() projectName: string = "unknown";

    @ViewChild("tagCopy") tagCopyInput: CopyInputComponent;
    @ViewChild("pushCopy") pushCopyInput: CopyInputComponent;
    @ViewChild("copyAlert") copyAlert: InlineAlertComponent;


    public get tagCommand(): string {
        return `docker tag SOURCE_IMAGE[:TAG] ${this.registryUrl}/${this.projectName}/IMAGE[:TAG]`;
    }

    public get pushCommand(): string {
        return `docker push ${this.registryUrl}/${this.projectName}/IMAGE[:TAG]`;
    }

    onclick(): void {
        if (this.tagCopyInput) {
            this.tagCopyInput.reset();
        }

        if (this.pushCopyInput) {
            this.pushCopyInput.reset();
        }

        if(this.copyAlert){
            this.copyAlert.close();
        }
    }

    onCpError($event: any): void {
        if(this.copyAlert){
            this.copyAlert.showInlineError("PUSH_IMAGE.COPY_ERROR");
        }
    }
}
