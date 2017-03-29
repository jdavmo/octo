import { Component, AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { single, multi } from './data';
import { TdDataTableSortingOrder, TdDataTableService, ITdDataTableSortChangeEvent,
          TdDigitsPipe } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

const NUMBER_FORMAT: any = (v: {value: number}) => v.value;
const DECIMAL_FORMAT: any = (v: {value: number}) => v.value.toFixed(2);

@Component({
  selector: 'qs-product-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class ProductStatsComponent implements AfterViewInit {
  columns: any[] = [
    { name: 'name',  label: 'Nombre' },
    { name: 'type', label: 'Tipo' },
    { name: 'ref', label: 'Referencia' },
    { name: 'usage', label: 'Cantidad', numeric: true, format: NUMBER_FORMAT },
    { name: 'users', label: 'Pintura' },
    { name: 'load', label: 'Largo', numeric: true, format: NUMBER_FORMAT },
    { name: 'time', label: 'Peso', numeric: true, format: DECIMAL_FORMAT },
    { name: 'quota', label: 'Precio', numeric: true, format: NUMBER_FORMAT },
    { name: 'sessions', label: 'Peso Total', numeric: true, format: DECIMAL_FORMAT },
    { name: 'containers', label: 'Precio Total', numeric: true, format: DECIMAL_FORMAT },
  ];

  data: any[] = [
      {
        'name': 'CANAL DE 3X1 ½',
        'type': 'Canales',
        'ref': 'U-069',
        'usage': { 'value': 1.0 },
        'users': 'Negra',
        'load': { 'value': 6.0 },
        'time': { 'value': 4.0 },
        'quota': { 'value': 9999.0 },
        'sessions': { 'value': 4.0 },
        'containers': { 'value': 9999.0 },
      }, {
        'name': 'T 2X1 CP',
        'type': 'Tubulares',
        'ref': 'T-037',
        'usage': { 'value': 1.0 },
        'users': 'Madera',
        'load': { 'value': 6.0 },
        'time': { 'value': 4.0 },
        'quota': { 'value': 9999.0 },
        'sessions': { 'value': 4.0 },
        'containers': { 'value': 9999.0 },
      }, {
        'name': 'ANG 3/4X3/4',
        'type': 'Angulos',
        'ref': 'A-059',
        'usage': { 'value': 1.0 },
        'users': 'Blanca',
        'load': { 'value': 6.0 },
        'time': { 'value': 4.0 },
        'quota': { 'value': 9999.0 },
        'sessions': { 'value': 4.0 },
        'containers': { 'value': 9999.0 },
      }, {
        'name': 'ALAMO F',
        'type': 'Pisavidrios',
        'ref': 'S-343',
        'usage': { 'value': 1.0 },
        'users': 'Negra',
        'load': { 'value': 6.0 },
        'time': { 'value': 4.0 },
        'quota': { 'value': 9999.0 },
        'sessions': { 'value': 4.0 },
        'containers': { 'value': 9999.0 },
      }, {
        'name': 'ENCHAPE',
        'type': 'Enchapes',
        'ref': 'F-06',
        'usage': { 'value': 1.0 },
        'users': 'Blanca',
        'load': { 'value': 6.0 },
        'time': { 'value': 4.0 },
        'quota': { 'value': 9999.0 },
        'sessions': { 'value': 4.0 },
        'containers': { 'value': 9999.0 },
      }
    ];

  // Chart
  single: any[];
  multi: any[];

  // Generic Chart options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  autoScale: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  colorScheme: any = {
    domain: [
      '#01579B', '#0091EA', '#FFB74D', '#E64A19',
    ],
  };

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _titleService: Title,
              private _dataTableService: TdDataTableService) {
                // Chart Single
                Object.assign(this, {single});
                // Chart Multi
                this.multi = multi.map((group: any) => {
                  group.series = group.series.map((dataItem: any) => {
                    dataItem.name = new Date(dataItem.name);
                    return dataItem;
                  });
                  return group;
                });
  }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'Product Stats' );
    this.filter();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
