import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  title: string;
  content: string;
}

interface PostId extends Post {
  id: string;
}


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})

export class StreamComponent {

  postsCol: AngularFirestoreCollection<Post>;

  posts: any

  timestamp: string;
  message: string;

  postsDoc: AngularFirestoreCollection<Post>;

  post: Observable<Post>;

  constructor(private afs: AngularFirestore) {


  }

  ngOnInit() {
    //this.postsCol = this.afs.collection('posts', ref => ref.where('title', '==', 'title'));

    this.postsCol = this.afs.collection('tournaments').doc('wKpiItxWegkyoHn8OLyI').collection('matches').doc('1').collection('score',ref => ref.orderBy('timestamp','desc'));

    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
  }



 
  /*
  getPost(postId) {
    console.warn(postId);
    this.post = this.afs.doc('posts/' + postId).valueChanges();
  }
*/

  deletePost(postId) {
    this.afs.collection('tournaments').doc('wKpiItxWegkyoHn8OLyI').collection('matches').doc('1').collection('score').doc(postId).delete();
    return false;
  }

  addPost() {

  }

}


