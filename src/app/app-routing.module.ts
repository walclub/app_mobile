import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'second/:price', loadChildren: './second/second.module#SecondPageModule' },
  { path: 'qr', loadChildren: './qr/qr.module#QrPageModule' },
  { path: 'transferir', loadChildren: './transferir/transferir.module#TransferirPageModule' },
  { path: 'confirm-transfer', loadChildren: './confirm-transfer/confirm-transfer.module#ConfirmTransferModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
