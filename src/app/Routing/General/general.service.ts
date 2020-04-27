import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsFeedComponent } from 'src/app/Components/news-feed/news-feed.component';
import { TeamsComponent } from 'src/app/Components/teams/teams.component';
import { TeamPageComponent } from 'src/app/Components/teams/team-page/team-page.component';

import { HomepageComponent } from 'src/app/Components/homepage/homepage.component';
import { FAQComponent } from 'src/app/Components/faq/faq.component';
import { AboutUsComponent } from 'src/app/Components/about-us/about-us.component';
import { WebsiteComponent } from 'src/app/Components/website.component';

export const router = [
  { path: '', component: WebsiteComponent, children: [
    { path: '', component: HomepageComponent },
    { path: 'newsfeed', component: NewsFeedComponent, data: { animation: 'newsfeed' } },
    { path: 'teams', component: TeamsComponent, data: { animation: 'team' } },
    { path: 'teams/:id', component: TeamPageComponent, data: { animation: 'teamtype' } },
    { path: 'events', loadChildren: 'src/app/Components/events/events.module#EventsModule', data: { animation: 'events' } },
    { path: 'faq', component: FAQComponent, data: { animation: 'faq' } },
    { path: 'aboutus', component: AboutUsComponent, data: { animation: 'aboutus' } },
  ]}
]

/* Exporting routes variable so we can use in the app.module.ts */
export const GeneralRoutesModule: ModuleWithProviders = RouterModule.forChild(router);
