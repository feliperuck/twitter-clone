import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'twitter-clone';
  hasTweets: boolean = false;
  tweetText: any = '';
  tweets: any[] = [];
  sessionStorageData: any[] = [];
  date = new Date();

  constructor() {}

  ngOnInit() {
    this.sessionStorageData = JSON.parse(<any>sessionStorage.getItem("tweets"))
    console.log(this.sessionStorageData);
    if (this.sessionStorageData) {
      this.tweets = this.sessionStorageData;
    }
    this.hasTweet();
  }

  tweetar() {
    this.tweets.push(this.tweetText);
    sessionStorage.setItem('tweets', JSON.stringify(this.tweets));
    this.hasTweets = true;
    console.log(sessionStorage.getItem('tweets'));
  }

  exclude() {
    this.hasTweet();
    Swal.fire({
      title: 'ATENÇÃO',
      text: 'Gostaria de excluir o tweet?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tweets.splice(this.tweets.indexOf(this.tweets), 1);
        sessionStorage.setItem('tweets', JSON.stringify(this.tweets));
        this.hasTweet();
      }
    });
  }

  hasTweet() {
    if (this.tweets == null) {
      this.hasTweets = false;
    } else {
      this.hasTweets = true;
    }
  }
}
