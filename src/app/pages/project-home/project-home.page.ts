import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.page.html',
  styleUrls: ['./project-home.page.scss'],
})
export class ProjectHomePage implements OnInit {
  // private project: Project;
  constructor(private route: ActivatedRoute, private router: Router) {
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.project = this.router.getCurrentNavigation().extras.state.projectData;
    //   }
    // });
  }

  ngOnInit() {
  }
}
