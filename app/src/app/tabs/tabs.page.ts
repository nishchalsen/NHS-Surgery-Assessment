import { Component, ViewChild, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  @ViewChild('tabs') tabs: IonTabs

  ngOnInit() {
    this.tabs.select('home')
  }
}
