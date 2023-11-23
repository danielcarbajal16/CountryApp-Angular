import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {
  public country?: Country;
  constructor(private activatedRoute: ActivatedRoute, private countriesService: CountriesService, private router: Router) {}

  //Primer implementación con params, permanece como referencia nada más
  // ngOnInit(): void {
  //     this.activatedRoute.params
  //       .subscribe(params => {
  //         console.log({ params: params['id'] }); //Se usa con los corchetes porque el objeto Params funciona de esa manera por el tipado estricto
  //       })
  // }
  
  //Método totalmente extraño con subscribes anidados
  ngOnInit(): void {
      this.activatedRoute.params
        .pipe(
          switchMap( ({ id: code }) => this.countriesService.searchCountryByAlphaCode( code ) )
        )
        .subscribe( (country) => {
          if (!country) {
            return this.router.navigateByUrl('');
          }
          console.log({ country });
          return this.country = country;
        })
  }
}
