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
    path: 'tasks',
    loadChildren: () =>
      import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
