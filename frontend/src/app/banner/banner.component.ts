import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  images: string[] = [
    'assets/image/banner41.jpg',
    'https://khostock.net/wp-content/uploads/2022/01/KS1985-Converted.jpg',
    '//bizweb.dktcdn.net/100/053/643/themes/877493/assets/banner-4.jpg?1676015641182',
    'assets/image/banner111.jpg',
    'assets/image/banner41.jpg',

  ];
  currentIndex = 0;
  currentImage!: string;
  showControls = false;

  ngOnInit() {
    this.showSlide(this.currentIndex);
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showSlide(this.currentIndex);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showSlide(this.currentIndex);
  }

  showSlide(index: number) {
    this.currentImage = this.images[index];
  }
  
}

