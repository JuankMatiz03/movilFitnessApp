import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'cp-image-lighbox',
  templateUrl: './image-lighbox.component.html',
  styleUrls: ['./image-lighbox.component.scss'],
})
export class ImageLighboxComponent  implements OnInit {
  @Output() image = new EventEmitter<string>();
  @Input() url: string = "https://ionicframework.com/docs/img/demos/avatar.svg";

  private platform: Platform = inject(Platform)
  urlStr: string = "https://ionicframework.com/docs/img/demos/avatar.svg";

  ngOnInit() {}

  async takeSelfie() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        direction: CameraDirection.Rear
      });

      if (photo && photo.base64String) {
        this.urlStr = 'data:image/jpeg;base64,' + photo.base64String;
        this.image.emit(this.urlStr);
      }
    } catch (error) {
      console.error('Error al abrir la cámara', error);
    }
  }

  async selectImage () {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      if(image) {
        this.savedImage(image)
        this.image.emit(this.urlStr);
      }
    }catch(error) {
      console.error('Error al abrir la galeria', error);
    }
  }

  async savedImage(photo: Photo) {
    const base64 = await this.readAsBase64(photo);

    this.urlStr = 'data:image/jpeg;base64,' + base64;
  }

  async readAsBase64(photo: Photo) {
    if(this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    }else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve: any, reject: any) =>{
    const reader = new FileReader()
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    }

    reader.readAsDataURL(blob);
  })


}
