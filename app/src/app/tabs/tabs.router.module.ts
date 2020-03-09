import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'help', loadChildren: '../help/help.module#HelpPageModule' },
      { path: 'feedback', loadChildren: '../feedback/feedback.module#FeedbackPageModule' },
      { path: 'survey', loadChildren: '../survey/survey.module#SurveyPageModule' },
      { path: 'history', loadChildren: '../history/history.module#HistoryPageModule' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
      { path: 'single-history', loadChildren: '../history/single-history/single-history.module#SingleHistoryPageModule' }
    ]
  }
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
