import { Component, OnInit } from '@angular/core';
import {CameraResultType, Plugins} from '@capacitor/core';


const { Camera } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async tirarFoto() {
    const imagem = await Camera.getPhoto({
      resultType: CameraResultType.Uri
    });
    console.log(imagem);
  }

}
