import { NgModule } from '@angular/core';

import { HrDataSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [HrDataSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [HrDataSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class HrDataSharedCommonModule {}
