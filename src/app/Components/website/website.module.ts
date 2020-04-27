import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { PostComponent } from '../news-feed/post/post.component';
import { TeamsComponent } from '../teams/teams.component';
import { TeamPageComponent } from '../teams/team-page/team-page.component';
import { FooterComponent } from '../footer/footer.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeHighlightsComponent } from '../homepage/home-highlights/home-highlights.component';
import { HomeEventsComponent } from '../homepage/home-events/home-events.component';
import { SponsorsComponent } from '../sponsors/sponsors.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { FAQComponent } from '../faq/faq.component';
import { DateCountdownTimerComponent } from '../general/date-countdown-timer/date-countdown-timer.component';
import { GeneralRoutesModule } from 'src/app/Routing/General/general.service';
import { WebsiteComponent } from '../website.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    WebsiteComponent,
    NewsFeedComponent,
    PostComponent,
    TeamsComponent,
    TeamPageComponent,
    FooterComponent,
    HomepageComponent,
    NavbarComponent,
    HomeHighlightsComponent,
    HomeEventsComponent,
    SponsorsComponent,
    AboutUsComponent,
    FAQComponent,
    DateCountdownTimerComponent,
  ],
  imports: [
    CommonModule,
    GeneralRoutesModule,
    SharedModule
  ]
})
export class WebsiteModule { }
