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
  searchData($event:any){
    this.dataSource.filter = $event.target.value; 
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }
  
}
