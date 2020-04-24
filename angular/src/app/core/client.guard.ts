import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.store.module';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      this.store.select('clients').pipe(filter(r => r.loaded), take(1))
        .subscribe(clients => {
          const clientId = Number(next.params.id);
          const foundClient = clients.data.find(c => c.id === clientId);

          if (foundClient) {
            resolve(true);
          } else {
            this.router.navigate(['/clients']);
          }
        });
    });
  }
}
