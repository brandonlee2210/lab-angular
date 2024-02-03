import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  currentRoute: string = this.router.url;

  ngOnInit() {
    // Accessing multiple route parameters
    const params = this.route.snapshot.paramMap;
  }

  navigateRoute(slug: string) {
    switch (slug) {
      case 'products':
        this.currentRoute = 'products';
        this.router.navigate(['/admin/products']);
        break;
      case 'users':
        this.currentRoute = 'users';
        this.router.navigate(['/admin/users']);
        break;
      case 'categories':
        this.currentRoute = 'categories';
        this.router.navigate(['/admin/categories']);
        break;

      default:
        break;
    }
  }
}
