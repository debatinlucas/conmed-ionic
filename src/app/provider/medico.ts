import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable()
export class MedicoProvider {
    private PATH = 'medico/';
    constructor(private db: AngularFireDatabase) {
    }
    getAll() {
        return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(m => ({key: m.payload.key, ...m.payload.val()}));
                })
            );
    }
    get(key: string) {
        return this.db.object(this.PATH + key).snapshotChanges()
        .pipe(
            map (m => {
                return {key: m.key, ...m.payload.val()};
            })
        );
    }
    save(medico: any) {
        return new Promise((resolve, reject) => {
            if (medico.key) {
                this.db.list(this.PATH)
                    .update(medico.key, {nome: medico.nome, crm: medico.crm, logradouro: medico.logradouro, numero: medico.numero,
                        cidade: medico.cidade, uf: medico.uf, celular: medico.celular, fixo: medico.fixo})
                    .then(() => resolve()).catch((e) => reject(e));
            } else {
                this.db.list(this.PATH)
                    .push({nome: medico.nome, crm: medico.crm, logradouro: medico.logradouro, numero: medico.numero,
                        cidade: medico.cidade, uf: medico.uf, celular: medico.celular, fixo: medico.fixo})
                    .then(() => resolve()).catch((e) => reject(e));
            }
        });
    }
    remove(key: string) {
        return this.db.list(this.PATH).remove(key);
    }
}
