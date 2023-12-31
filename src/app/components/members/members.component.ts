import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Trainee } from 'src/app/trainee';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  trainees!: Trainee[];
  displayedColumns: string[] = ['id', 'name', 'email', 'location', 'actions'];
  dataSource!: MatTableDataSource<Trainee>;
  currentPage = 0;

  columnsToFilter = ['name', 'emailId', 'location'];
  selectedColumn: string = '';
   filterValue: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getTrainees();
  }

  private getTrainees() {
    this.authService.getAllTrainees().subscribe((data: any) => {
      this.trainees = data;
      this.dataSource = new MatTableDataSource(this.trainees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteTrainee(id: number) {
    this.authService.deleteTraineee(id).subscribe(
      () => {
        window.alert("Deleted Successfully!");
        this.getTrainees();
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.error('Error deleting trainee:', error);
      }
    );
  }

  memberDetails(id: number) {
    this.router.navigate(['view', id]);
  }

  updateTrainee(id: number) {
    this.router.navigate(['update', id]);
  }

  goBackTo() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.authService.logOut();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Optionally, you can set the filterPredicate based on the selected column
    switch (this.selectedColumn) {
      case 'name':
        this.dataSource.filterPredicate = (data, filter) =>
          data.name.trim().toLowerCase().includes(filter);
        break;
      case 'emailId':
        this.dataSource.filterPredicate = (data, filter) =>
          data.emailId.trim().toLowerCase().includes(filter);
        break;
      case 'location':
        this.dataSource.filterPredicate = (data, filter) =>
          data.city.trim().toLowerCase().includes(filter);
        break;
      default:
        this.dataSource.filter = filterValue;
        break;
    }
  }
}


