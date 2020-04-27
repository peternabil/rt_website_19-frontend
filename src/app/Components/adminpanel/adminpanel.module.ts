import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';


/** Services */
import { AdminpanelRoutesModule } from 'src/app/Routing/adminpanel/adminpanel.router';
import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';
import { UsersService } from 'src/app/Services/adminpanel/users.service';
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service';

/* Componenents */
import { AdminpanelComponent } from './adminpanel.component';
import { MainDashboardComponent } from './dashboards/main-dashboard/main-dashboard.component';
import { AdminSidebarComponent } from './partials/admin-sidebar/admin-sidebar.component';
import { UsersDashboardComponent } from './dashboards/users-dashboard/users-dashboard.component';
import { HighlightsDashboardComponent } from './dashboards/highlights-dashboard/highlights-dashboard.component';
import { HighlightCardComponent } from './dashboards/highlights-dashboard/highlight-card/highlight-card.component';
import { HighlightEditComponent } from './dashboards/highlights-dashboard/highlight-edit/highlight-edit.component';
import { HighlightsListComponent } from './dashboards/highlights-dashboard/highlights-list/highlights-list.component';
import { EventsDashboardComponent } from './dashboards/events-dashboard/events-dashboard.component';
import { EventCardComponent } from './dashboards/events-dashboard/event-card/event-card.component';
import { NewsfeedDashboardComponent } from './dashboards/newsfeed-dashboard/newsfeed-dashboard.component';
import { ArticlesListComponent } from './dashboards/newsfeed-dashboard/articles-list/articles-list.component';
import { ArticleEditComponent } from './dashboards/newsfeed-dashboard/article-edit/article-edit.component';
import { ArticleComponent } from './dashboards/newsfeed-dashboard/article/article.component';
import { TeamsDashboardComponent } from './dashboards/teams-dashboard/teams-dashboard.component';
import { TeamsListComponent } from './dashboards/teams-dashboard/teams-list/teams-list.component';
import { TeamEditComponent } from './dashboards/teams-dashboard/team-edit/team-edit.component';
import { TeamComponent } from './dashboards/teams-dashboard/team/team.component';
import { NewsfeedService } from 'src/app/Services/adminpanel/newsfeed.service';
import { TeamsService } from 'src/app/Services/adminpanel/teams.service';
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import { SponsorsDashboardComponent } from './dashboards/sponsors-dashboard/sponsors-dashboard.component';
import { EventEditComponent } from './dashboards/events-dashboard/event-edit/event-edit.component';
import { EventListComponent } from './dashboards/events-dashboard/event-list/event-list.component';
import { SponsorsListComponent } from './dashboards/sponsors-dashboard/sponsors-list/sponsors-list.component';
import { SponsorsCreateComponent } from './dashboards/sponsors-dashboard/sponsors-create/sponsors-create.component';
import { FAQDashboardComponent } from './dashboards/faq-dashboard/faq-dashboard.component';
import { FAQCreateComponent } from './dashboards/faq-dashboard/faq-create/faq-create.component';
import { FAQListComponent } from './dashboards/faq-dashboard/faq-list/faq-list.component';
import { FAQService } from 'src/app/Services/adminpanel/faq.service';
import { SponsorsService } from 'src/app/Services/adminpanel/sponsors.service';



@NgModule({
  declarations: [
    AdminpanelComponent,
    MainDashboardComponent,
    AdminSidebarComponent,
    UsersDashboardComponent,
    HighlightsDashboardComponent,
    HighlightCardComponent,
    HighlightEditComponent,
    HighlightsListComponent,
    EventsDashboardComponent,
    EventCardComponent,
    ArticleComponent,
    TeamsDashboardComponent,
    TeamsListComponent,
    TeamEditComponent,
    TeamComponent,
    SponsorsDashboardComponent,
    NewsfeedDashboardComponent,
    ArticlesListComponent,
    ArticleEditComponent,
    ArticleComponent,
    EventEditComponent,
    EventListComponent,
    SponsorsListComponent,
    SponsorsCreateComponent,
    FAQDashboardComponent,
    FAQListComponent,
    FAQCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminpanelRoutesModule,
    ImageCropperModule
  ],
  providers:[
    AdminpanelService,
    UsersService,
    HighlightsService,
    NewsfeedService,
    TeamsService,
    EventsService,
    FAQService,
    SponsorsService,
  ]
})
export class AdminpanelModule { }
