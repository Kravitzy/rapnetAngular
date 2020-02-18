import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  Size : number;
  Color : string;
  Clarity : string;
  Price : number;
  ListPrice : number;
  Id : number;}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {Size: 1, Color: 'Hydrogen', Clarity: "IV", Price:10000, ListPrice:12000, Id : 1 },
  {Size: 1, Color: 'Helium', Clarity: "IV", Price:10000, ListPrice:12000, Id : 2 },
  {Size: 1, Color: 'Lithium', Clarity: "IV", Price:10000, ListPrice:12000, Id : 3 },
  {Size: 1, Color: 'Beryllium', Clarity: "IV", Price:10000, ListPrice:12000, Id : 4 }
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Color': return compare(a.Color, b.Color, isAsc);
        case 'Size': return compare(+a.Size, +b.Size, isAsc);
        case 'Clarity': return compare(a.Clarity, b.Clarity, isAsc);
        case 'Price': return compare(+a.Price, +b.Price, isAsc);
        case 'ListPrice': return compare(+a.ListPrice, +b.ListPrice, isAsc);
        case 'Id': return compare(+a.Id, +b.Id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
