import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatNativeDateModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { NavigationItem } from './portal-layout.types'

@Component({
  selector: 'portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrl: './portal-layout.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterOutlet,
    NgOptimizedImage,
    OverlayModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class PortalLayoutComponent {
  public profileDropOpened = false
  public openedSubmenu = signal<number | null>(null)
  menuList: NavigationItem[] = [
    {
      id: 'dashboard',
      title: 'Tableau de bord',
      icon: '',
      link: 'dashboard',
      type: 'basic',
    },
    {
      id: 'warehouses',
      title: 'Entrepôts',
      icon: '',
      link: 'warehouses',
      type: 'basic',
    },
  ]

  private breakpointObserver = inject(BreakpointObserver)
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    )
  private readonly _router = inject(Router)

  public goToPage(item: NavigationItem) {
    this._router.navigate([item.link], item.navigationExtras)
  }

  toggleSubMeu(index: number) {
    if (index === this.openedSubmenu()) {
      this.openedSubmenu.set(null)
    } else {
      this.openedSubmenu.set(index)
    }
  }
}
