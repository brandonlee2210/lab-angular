import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Homeppage';
  menuList = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'About Us',
      link: '/about-us',
    },
    {
      label: 'Shop',
      link: '/shop',
    },
    {
      label: 'Contact',
      link: '/',
    },
  ]; // NgFor
}
