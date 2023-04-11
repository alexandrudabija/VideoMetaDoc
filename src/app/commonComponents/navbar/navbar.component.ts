import { Component, Output, EventEmitter, OnInit, ViewEncapsulation, HostListener, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { CategoriesService } from 'src/app/services/categories.service';
import { Observable } from 'rxjs';
import { TweenMax, Power2 } from 'gsap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  @Output() scroll = new EventEmitter<string>();
  @ViewChild('underMenu') underMenu!: ElementRef;
  menuVisible:boolean = false;
  public selectedLanguage!: string;
  isSmallScreen = window.innerWidth < 1000;
  public showOptions: boolean = false;
  public showNavbar: boolean = false;
  public timeline = gsap.timeline({ paused: true });
  public tl = gsap.timeline();
  public bool: boolean = false;


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth < 1000;
  }



  readonly languageArray: Array<{ language: string }> = [
    { language: 'ro' },
    { language: 'ru' },
    { language: 'it' },
    { language: 'en' },
    { language: 'fr' },
    { language: 'ar' },
    { language: 'ja' },
    { language: 'es' },
    { language: 'de' },
    { language: 'tr' },
    { language: 'uk' },
    { language: 'zh' },
    { language: 'hi' },
  ]



  // openAboveMenu():void {
  //   this.underMenu.nativeElement.style.display = 'block';
  // }
  // closeAboveMenu(): void {
  //   this.underMenu.nativeElement.style.display = 'none';

  // }

  toggle(): void

  {
if(this.bool===false)
{
  gsap.to('.bar1', { duration: .2, width: '45px', height: '6px', top: '45%', left: '15%', rotate: '45deg' }),
    gsap.to('.bar2', { duration: .2, opacity: 0 }),
    gsap.to('.bar3', { duration: .2, width: '45px', height: '6px', top: '45%', left: '15%', rotate: '-45deg' });
  this.tl.to('.navBack', { duration: .5, width: '100%', ease: 'power2.in', height: '100vh',position:'absolute',overflow:'none'});

  this.tl.to('.bt', { duration: .5, opacity: 1, ease: 'power3.in', stagger: .15 });

  this.bool = true;

}

else
{
  gsap.to('.bar1', {
    duration: .2,
    width: '37px',
    height: '5px',
    top: '25%',
    left: '22%',
    rotate: '0deg'

  });


  gsap.to('.bar2', {
    duration: .2,
    width: '37px',
    height: '5px',
    top: '45%',
    left: '22%',
    opacity: 1
  });

  gsap.to('.bar3', {
    duration: .2,
    width: '37px',
    height: '5px',
    top: '65%',
    left: '22%',
    rotate: '0deg'
  });


  this.tl.to('.bt', { duration: .7, opacity: 0, ease: 'power3.out', stagger: .1 });
  this.tl.to('.navBack', { duration: .5, delay: .2, width: 0, height: 0, ease: 'power2.out'  });

  this.bool = false;
  }


  }
  categories$ = new Observable<{ cat: Array<{ title: string, image: string; }> }>

  constructor(private translate: TranslateService, private Router: Router, private categoriesService: CategoriesService) {
   ;
   }

  ngOnInit(): void {


    const browserLang: string = JSON.parse(localStorage.getItem('selectedLanguage')!) || this.translate.getBrowserLang() || 'en';
    this.selectedLanguage = browserLang;
    this.translate.setDefaultLang(browserLang)
    this.translate.use(browserLang);

    this.categories$ = this.categoriesService.categories;



  }

  switchLanguage(selectedLanguage: string): void {


    this.selectedLanguage = selectedLanguage
    this.translate.use(selectedLanguage);

 localStorage.setItem("selectedLanguage", JSON.stringify(selectedLanguage));

  }

  onCategory(myParameter: string): void {


    // this.router.navigate(['page2'], { queryParams: { id: this.id } });

    this.Router.navigate(['/shop', myParameter]);



  }





  toggleNavbar(): void
  {
    this.showNavbar = !this.showNavbar;
    const maxHeight = this.showNavbar ? "750px" : "0";
    gsap.to('.Navbar-container', { maxHeight: maxHeight, duration: 0.3 });
  }





  toggleOptions(): void {
    this.showOptions = !this.showOptions;
    const maxHeight = this.showOptions ? "750px" : "0";
    gsap.to('.options-container', { maxHeight: maxHeight, duration: 0.3 });
  }
  navToRoute(route:string):void
  {
    this.Router.navigate([`/${route}`]);

    if (this.isSmallScreen)
    {
      this.toggle();
      }

  }


  onMenuEnter() {
    this.menuVisible = true;
    TweenMax.fromTo(this.underMenu.nativeElement, 0.5, { opacity: 0, y: -20 }, { opacity: 1, y: 0, ease: Power2.easeOut });
    this.underMenu.nativeElement.style.display = 'block';
  }

  onMenuLeave() {
    this.menuVisible = false;
    TweenMax.to(this.underMenu.nativeElement, 0.5, { opacity: 0, y: -20, ease: Power2.easeOut });
    this.underMenu.nativeElement.style.display = 'none';
  }

}
