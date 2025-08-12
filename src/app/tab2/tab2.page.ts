import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/angular/standalone';
import { PhotoService } from '../services/photo.service';
import { addIcons } from 'ionicons';
import { camera, trash, close } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonFab, 
    IonFabButton, 
    IonIcon, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonImg,
    IonActionSheet
  ]
})
export class Tab2Page {

  constructor(public photoService: PhotoService) {
    addIcons({ camera, trash, close });
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: any, position: number) {
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Photos';
    actionSheet.buttons = [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.photoService.deletePicture(photo, position);
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // Nothing to do, action sheet is automatically closed
      }
    }];
    document.body.appendChild(actionSheet);
    await actionSheet.present();
  }

}
