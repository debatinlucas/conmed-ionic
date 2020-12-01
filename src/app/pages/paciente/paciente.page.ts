import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AlertController, ToastController} from '@ionic/angular';
import {PacienteService} from '../../services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {
  pacientes: any;
  constructor(private service: PacienteService, public alertController: AlertController, public toastController: ToastController) {
    this.service.recuperarTodos(1).subscribe(p => {
      this.pacientes = p;
    });
  }

  ngOnInit() {
  }

  async excluirAlertConfirm(key: string) {
    const alert = await this.alertController.create({
      header: 'Excluir',
      message: 'Deseja excluir o <strong>paciente</strong>?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            if (key) {
              /*this.provider.remove(key)
                  .then(() => {
                    this.mensagem('Paciente excluído!');
                  })
                  .catch((e) => {
                    this.mensagem('Erro ao excluir o paciente.');
                    console.error(e);
                  });*/
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async mensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }

}
