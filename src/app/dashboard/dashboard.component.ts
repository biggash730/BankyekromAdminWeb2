import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lookup } from '../shared/common-entities.model';
import { finalize, map } from 'rxjs/operators';
import { SettingsService } from '../app-settings/settings/settings.service';
import { DashboardService } from './dashboard.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Chart } from 'chart.js'

interface SustainabilityStatusQuery {
  areaId: number
  pillarId: number
  topicId: number
  programId: number
  districtId: number
  dateFrom: Date
  dateTo: Date
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  generalStats$: Observable<any[]>
  loadingGeneralStats: boolean
  yearlyStats$: Observable<Lookup[]>
  loadingYearlyStats: boolean
  @BlockUI('generalstats') blockGeneralStats: NgBlockUI
  @BlockUI('yearlystats') blockYearlyStats: NgBlockUI
  doughnut = {}
  pie = {}
  @ViewChild('doughnutcanvas') doughnutcanvas: ElementRef
  @ViewChild('piecanvas') piecanvas: ElementRef
  year: number
  years: number[]

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.years = [this.year + 2, this.year + 1, this.year, this.year - 1, this.year - 2, this.year - 3, this.year -  4, this.year - 5]
    this.getGeneralStats();
    this.getYearlyStats();
  }

  ngAfterViewInit() {
    // this.landAreaDoughnut()
    // this.subscriberCommodityPie()
  }

  setProgressColor(percentage: number) {
    if (percentage >= 70 && percentage <= 100) {
      return 'bg-success'
    } else if (percentage >= 50 && percentage < 70) {
      return 'bg-warning'
    } else if (percentage >= 25 && percentage < 50) {
      return 'bg-pink'
    } else { return 'bg-danger' }
  }

  yearOnChange() {
    console.log(this.year)
    this.blockYearlyStats.start('Loading...')
    this.yearlyStats$ = this.dashboardService.getYearlyStatistics(this.year).pipe(
      finalize(() => this.blockYearlyStats.stop())
    )
  }

  // private subscriberCommodityPie() {
  //   this.blockCommodity.start('Loading...')
  //   this.dashboardService.getCommoditySummary().subscribe(res => {
  //     this.blockCommodity.stop()
  //     if (res.success) {
  //       const data = [res.data.cocoa, res.data.gold, res.data.palmOil];
  //       const labels = ['Cocoa ' + res.data.cocoa, 'Gold ' + res.data.gold, 'Oil Palm ' + res.data.palmOil];
  //       const total = res.data.cocoa + res.data.gold + res.data.palmOil;

  //       // const data = [20, 30, 40, 50]
  //       this.pie = new Chart(this.piecanvas.nativeElement, {
  //         type: 'pie',
  //         data: {
  //           labels: labels,
  //           datasets: [
  //             {
  //               data: data,
  //               backgroundColor: ['#7a401b', '#ffc800', '#d81d1e', '#a3a0fb']
  //             }
  //           ]
  //         },
  //         options: {
  //           legend: {
  //             position: 'bottom',
  //             labels: {
  //               boxWidth: 10
  //             }
  //           },
  //           responsive: true,
  //           maintainAspectRatio: false
  //         }
  //       })
  //     }
  //   }, () => this.blockCommodity.stop())

  // }

  // private landAreaDoughnut() {
  //   this.blockLand.start('Loading...')
  //   this.dashboardService.getLandArea().subscribe(res => {
  //     this.blockLand.stop()
  //     if (res.success) {
  //       const data = [res.data.cocoa, res.data.gold, res.data.palmOil];
  //       const labels = ['Cocoa ' + res.data.cocoa + ' Hectares', 'Gold ' + res.data.gold + ' Hectares', 'Oil Palm ' + res.data.palmOil + ' Hectares'];
  //       const total = res.data.cocoa + res.data.gold + res.data.palmOil;

  //       // const data = [20, 30, 40, 50]
  //       this.doughnut = new Chart(this.doughnutcanvas.nativeElement, {
  //         type: 'doughnut',
  //         data: {
  //           labels: labels,
  //           datasets: [
  //             {
  //               data: data,
  //               backgroundColor: ['#7a401b', '#ffc800', '#d81d1e', '#a3a0fb']
  //             }
  //           ]
  //         },
  //         options: {
  //           cutoutPercentage: 80,
  //           legend: {
  //             position: 'bottom',
  //             labels: {
  //               boxWidth: 10
  //             }
  //           },
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           elements: {
  //             center: {
  //               text: total,
  //               color: '#797b85',
  //               fontStyle: 'Helvetica',
  //               sidePadding: -30
  //             }
  //           }
  //         }
  //       })
  //     }
  //   }, () => this.blockLand.stop())
  // }

  getGeneralStats() {
    this.blockGeneralStats.start('Loading')
    this.generalStats$ = this.dashboardService.getGeneralStatistics().pipe(
      finalize(() => this.blockGeneralStats.stop())
    )
  }

  getYearlyStats() {
    this.blockYearlyStats.start('Loading')
    this.yearlyStats$ = this.dashboardService.getYearlyStatistics(this.year).pipe(
      finalize(() => this.blockYearlyStats.stop())
    )
  }

}
