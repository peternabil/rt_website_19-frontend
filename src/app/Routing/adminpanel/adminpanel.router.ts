import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminpanelComponent } from 'src/app/Components/adminpanel/adminpanel.component';
import { MainDashboardComponent } from 'src/app/Components/adminpanel/dashboards/main-dashboard/main-dashboard.component';
import { UsersDashboardComponent } from 'src/app/Components/adminpanel/dashboards/users-dashboard/users-dashboard.component';
import { HighlightsDashboardComponent } from 'src/app/Components/adminpanel/dashboards/highlights-dashboard/highlights-dashboard.component';
import { HighlightEditComponent } from 'src/app/Components/adminpanel/dashboards/highlights-dashboard/highlight-edit/highlight-edit.component';
import { HighlightsListComponent } from 'src/app/Components/adminpanel/dashboards/highlights-dashboard/highlights-list/highlights-list.component';
import { EventsDashboardComponent } from 'src/app/Components/adminpanel/dashboards/events-dashboard/events-dashboard.component';
import { NewsfeedDashboardComponent } from 'src/app/Components/adminpanel/dashboards/newsfeed-dashboard/newsfeed-dashboard.component';
import { ArticlesListComponent } from 'src/app/Components/adminpanel/dashboards/newsfeed-dashboard/articles-list/articles-list.component';
import { ArticleEditComponent } from 'src/app/Components/adminpanel/dashboards/newsfeed-dashboard/article-edit/article-edit.component';
import { TeamsDashboardComponent } from 'src/app/Components/adminpanel/dashboards/teams-dashboard/teams-dashboard.component';
import { TeamsListComponent } from 'src/app/Components/adminpanel/dashboards/teams-dashboard/teams-list/teams-list.component';
import { TeamEditComponent } from 'src/app/Components/adminpanel/dashboards/teams-dashboard/team-edit/team-edit.component';
import { SponsorsDashboardComponent } from 'src/app/Components/adminpanel/dashboards/sponsors-dashboard/sponsors-dashboard.component';
import { FAQDashboardComponent } from 'src/app/Components/adminpanel/dashboards/faq-dashboard/faq-dashboard.component';
import { EventListComponent } from 'src/app/Components/adminpanel/dashboards/events-dashboard/event-list/event-list.component';
import { EventEditComponent } from 'src/app/Components/adminpanel/dashboards/events-dashboard/event-edit/event-edit.component';
import { GroupPermissionGuard } from './group-permission.guard';

export const router = [
    { path: '', component: AdminpanelComponent, canActivate: [GroupPermissionGuard], children: [
        { path: '', component: MainDashboardComponent},
        { path: 'users', component: UsersDashboardComponent, canActivate: [GroupPermissionGuard]},
        { path: 'highlights', component: HighlightsDashboardComponent, canActivate: [GroupPermissionGuard], children:[
            { path: '', component: HighlightsListComponent},
            { path: 'create', component: HighlightEditComponent},
            { path: 'edit/:id', component: HighlightEditComponent},
        ]},
        { path: 'news-feed', component: NewsfeedDashboardComponent, canActivate: [GroupPermissionGuard], children:[
            { path: '', redirectTo:'all', pathMatch:'full'},
            { path: 'all', component: ArticlesListComponent},
            { path: 'create', component: ArticleEditComponent},
            { path: 'edit/:id', component: ArticleEditComponent},
        ]},
        { path: 'teams', component: TeamsDashboardComponent, canActivate: [GroupPermissionGuard], children:[
            { path: '', redirectTo:'all', pathMatch:'full'},
            { path: 'all', component: TeamsListComponent},
            { path: 'create', component: TeamEditComponent},
            { path: 'edit/:id', component: TeamEditComponent},
        ]},
        { path: 'events', component: EventsDashboardComponent, canActivate: [GroupPermissionGuard], children:[
            { path: '', redirectTo:'all', pathMatch:'full'},
            { path: 'all', component: EventListComponent},
            { path: 'create', component: EventEditComponent},
            { path: 'edit/:id', component: EventEditComponent},
        ]},
        { path: 'sponsors', component: SponsorsDashboardComponent, canActivate: [GroupPermissionGuard]},
        { path: 'FAQ', component: FAQDashboardComponent, canActivate: [GroupPermissionGuard]},
    ]},
    //{ path: '**', redirectTo: '/' },
    //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const AdminpanelRoutesModule: ModuleWithProviders = RouterModule.forChild(router);
