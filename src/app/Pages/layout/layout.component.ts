import { Component } from '@angular/core';
import { ProductService } from '../../Service/ProductService/product.service';
import { NgIcon, NgIconsModule, provideIcons } from '@ng-icons/core';
// import heroHomeSolid from '@ng-icons/heroicons';
import { bootstrapBellFill, bootstrapHeart, bootstrapHeartFill, bootstrapSearch, bootstrapSliders, bootstrapSuitHeart, bootstrapPersonFill, bootstrapHouseFill, bootstrapGear, bootstrapGearFill, bootstrapCollection, bootstrapHouse, bootstrapCollectionFill } from '@ng-icons/bootstrap-icons'
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../Shared/footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [NgIcon, RouterOutlet, CommonModule, FormsModule, RouterLink, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  viewProviders: [provideIcons({ bootstrapSearch, bootstrapHeart, bootstrapSliders, bootstrapSuitHeart, bootstrapHeartFill, bootstrapGear, bootstrapBellFill, bootstrapPersonFill, bootstrapHouseFill, bootstrapGearFill, bootstrapCollection, bootstrapHouse, bootstrapCollectionFill })]
})
export class LayoutComponent {
  // icons={heroHomeSolid};
  activeTab: string = 'home'
  productOptions: Array<string> = []
  filteredOptions: string[] = []
  _id: string = ''
  constructor(private service: ProductService,private route:ActivatedRoute,private router:Router) { }
  name:any
  inputText:string =''

  ngOnInit() {
    this.service.GetProducts().subscribe((response) => {
      // console.log('Products:', response);
      // console.log('Products:', response.products);
      this.productOptions = response.products.map((product: { name: any; }) => product.name)
      // console.log(this.productOptions);
    });
  }
  filterProducts(searchText: string): void {
    this.inputText = searchText
    if (!this.inputText.trim()) {
      this.filteredOptions = []; // Hide all options when search is empty
      return;
    }

    this.filteredOptions = this.productOptions.filter(option =>
      option.toLowerCase().includes(this.inputText.toLowerCase())
    );
    // this.inputText = ""
    // this.filteredOptions = []
  }

  showCar(option:string,searchBox: HTMLInputElement){
    // console.log('option',option);
    this.name =option
    // console.log('object',this.name);
    // this.name =this.route.snapshot.paramMap.get('name')
    // console.log('s',this.name);
    this.service.GetProductsbyName(this.name).subscribe((response)=>{
      // console.log(response.products[0]._id);
      this._id = response.products[0]._id
      this.filteredOptions = []
      this.productOptions = []
      console.log(this.inputText);
      searchBox.value = ""
      this.router.navigate([`/carDetails/${this._id}`])
    })
  }

  toggleIcon(tab: string) {
    this.activeTab = tab
    if (tab == "home") {
        this.router.navigate(['/dashboard'])
    }
    else if (tab == "category") {
        this.router.navigate(['/category'])
    }else if (tab == "favourite") {
        this.router.navigate(['/favourites'])
    }else if (tab == "setting") {
        this.router.navigate(['/profile'])
    }
  }
}
