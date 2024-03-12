import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { menuCategories } from '../../../constants/menu-categories';
import { MenuItem } from 'primeng/api';
import {User} from "../../../models/user";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  @Input()
  public user: User;
  @Output()
  public logoutUser = new EventEmitter<Event>()
  public sidebarVisible: boolean;
  public currentPageTitle: string;
  public readonly menuCategories = menuCategories;
  public items: MenuItem[] = [];
  constructor(public readonly router: Router) {}
  public ngOnInit(): void {
    this.initItems();
    this.initCurrentPageTitle();
  }
  public initItems(): void {
    this.menuCategories.forEach((category) => {
      this.items.push({
        label: category.title,
        command: () => {
          this.router.navigate([`/${category.routerLink}`]);
          this.sidebarVisible = false;
        },
      });
    });
  }
  private initCurrentPageTitle() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkCurrentPageTitle(event.url);
      }
    });
  }
  private checkCurrentPageTitle(url: string) {
    const arrayUrl = url.split('/');
    this.menuCategories.forEach((category) => {
      if (category.routerLink === arrayUrl[1]) {
        this.currentPageTitle = category.title;
        return;
      } else if (!this.currentPageTitle) {
        this.currentPageTitle = 'Главная';
      }
    });
  }
}
