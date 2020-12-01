import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AlertController, ToastController} from '@ionic/angular';
import {ConsultaProvider} from '../../provider/consulta';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  consultas: Observable<any>;
  constructor(private provider: ConsultaProvider, public alertController: AlertController, public toastController: ToastController) {
    this.consultas = this.provider.getAll();
  }

  ngOnInit() {
  }

  async excluirConsulta(key: string) {
    const alert = await this.alertController.create({
      header: 'Excluir Consulta',
      message: 'Deseja realmente excluir a <strong>consulta</strong>?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { }
        }, {
          text: 'Sim',
          handler: () => {
            if (key) {
              this.provider.remove(key)
                  .then(() => {
                    this.mensagem('Consulta excluída!');
                  })
                  .catch((e) => {
                    this.mensagem('Erro ao excluir a consulta.');
                    console.log(e);
                  });
            }
          }
        }]
    });
    await alert.present();
  }
  async mensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 4000
    });
    toast.present();
  }

}
