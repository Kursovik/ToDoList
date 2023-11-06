import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {menuCategories} from "../../../shared/constants/menu-categories";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  public categories = menuCategories;
constructor(private router: Router) {
}
public ngOnInit(): void {
 this.categories =  this.categories.filter((category) => !!category.routerLink)
}
 public menuNavigate(url: string) {
    this.router.navigate([url]);
  }


}
