import { Component, OnInit, Input } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  teamA: number;
  teamB: number;
}


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent implements OnInit {

  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  post: Observable<Post>;

  postDoc: AngularFirestoreDocument<Post>;

  chboxStream = false;


  constructor(private afs: AngularFirestore) {


  }

  ngOnInit() {
    //this.postsCol = this.afs.collection('posts', ref => ref.where('title', '==', 'title'));
    this.postsCol = this.afs.collection('tournaments').doc('wKpiItxWegkyoHn8OLyI').collection('matches').doc('1').collection('score');
    this.postDoc = this.postsCol.doc('7HzEyM90QJ6NtczxF9kQ');
    this.post = this.postDoc.valueChanges();

  }


  changeScore(team: string, scoreChange: number) {

    //stream
    var message: string;
    var scoreA: number;
    var scoreB: number;


    if (this.chboxStream) {
      if (team == 'teamA') {
        scoreA = parseFloat(document.querySelector('#teamA').innerHTML) + scoreChange;
        scoreB = parseFloat(document.querySelector('#teamB').innerHTML);

      } else {
        scoreA = parseFloat(document.querySelector('#teamA').innerHTML);
        scoreB = parseFloat(document.querySelector('#teamB').innerHTML) + scoreChange;
      }

      message = scoreA + ' : ' + scoreB
      
      this.afs.collection('tournaments').doc('wKpiItxWegkyoHn8OLyI').collection('matches').doc('1').collection('score').add({
        message: [message],
        timestamp: Date()

      });
    }

    //score
    this.postDoc.update({
      [team]: [parseFloat(document.querySelector('#' + [team]).innerHTML) + scoreChange]
    }
    )





  }


}







