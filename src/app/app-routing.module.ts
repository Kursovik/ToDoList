import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/main-menu/main-menu.module').then(
        (m) => m.MainMenuModule,
      ),
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./pages/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: 'authorization',
    loadChildren: () =>
      import('./shared/ui/authorization/authorization.module').then(
        (m) => m.AuthorizationModule,
      ),
  },
  {
    path: '**',
    redirectTo: '/authorization/login',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
