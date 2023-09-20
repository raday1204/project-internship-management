import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fronend'; // Typo in 'Fronend', should be 'Frontend'?

  public showButtons = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check the current route to decide whether to show buttons
        this.showButtons = !event.url.includes('/login-officer') && !event.url.includes('/login-student');
      }
    });
  }
}