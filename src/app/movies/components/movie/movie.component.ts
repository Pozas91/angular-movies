import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../models';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  @Input() index: number;

  icons = {
    trash: faTrash
  };

  onDeleteMovie() {
    console.log(this.movie);
    console.log(this.index);
  }

  ngOnInit(): void {
  }
}
