import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotesPopoverPage } from './notes-popover';

@NgModule({
  declarations: [
    NotesPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(NotesPopoverPage),
  ],
})
export class NotesPopoverPageModule {}
