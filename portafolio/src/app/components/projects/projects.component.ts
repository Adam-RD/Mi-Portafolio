import { Component } from '@angular/core';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = PROJECTS;
}

