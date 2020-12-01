import { Component, OnInit } from '@angular/core';
import {MedicoProvider} from '../../provider/medico';
import {Observable} from 'rxjs';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.page.scss'],
})
export class MedicoPage implements OnInit {
  medicos: Observable<any>;
  constructor(private provider: MedicoProvider, public alertController: AlertController, public toastController: ToastController) {
    this.medicos = this.provider.getAll();
  }

  ngOnInit() {
  }

  async excluirMedico(key: string) {
    const alert = await this.alertController.create({
      header: 'Excluir Médico',
      message: 'Deseja realmente excluir o <strong>médico</strong>?',
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
                    this.mensagem('Médico excluído!');
                  })
                  .catch((e) => {
                    this.mensagem('Erro ao excluir o médico.');
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
