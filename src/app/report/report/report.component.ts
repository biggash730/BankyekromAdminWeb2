import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouteNames } from 'src/app/shared/constants';
import { ReportService } from '../report.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';

interface ReportConfig {
  title: string
  query: string
  columns: any
  data: any
  filters?: any
  downloadWordUrl?: string
  downloadExcelUrl?: string
  downloadPdfUrl?: string
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  reports: ReportConfig[]
  selectedReport: ReportConfig
  @BlockUI() blockUi: NgBlockUI
  unsubscribe$ = new Subject<void>()
  params: any

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reports = [
      {
        title: 'Famers List',
        query: 'reports/farmerslist/list',
        columns: ['name', 'phoneNumber', 'gender', 'dateOfBirth', 'ghanaPostGps', 'town', 'area', 'district', 'region', 'farms'],
        data: [],
        filters: [
          { label: 'Name', type: 'text', model: 'name' },
          { label: 'Phone Number', type: 'text', model: 'phoneNumber' },
          { label: 'Town', type: 'text', model: 'town' },
          { label: 'Catchment Area', type: 'select', model: 'areaId', lookupUrl: 'catchmentareas', lookupStore: 'catchmentareas/get' },
          { label: 'District', type: 'select', model: 'districtId', lookupUrl: 'districts', lookupStore: 'districts/get' },
          { label: 'Region', type: 'select', model: 'regionId', lookupUrl: 'regions', lookupStore: 'regions/get' }
        ],
        downloadWordUrl: 'reports/farmerslist/word',
        downloadExcelUrl: 'reports/farmerslist/excel',
        downloadPdfUrl: 'reports/farmerslist/pdf'
      }
    ]
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getReportData(params: any) {
    this.blockUi.start('Loading...')
    this.params = params
    this.reportService.getReport(this.selectedReport.query, params)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.blockUi.stop())
      )
      .subscribe(res => {
        if (res.success) {
          this.selectedReport.data = res.data
        }
      })
  }

  downloadWord() {
    this.blockUi.start('Downloading...')
    this.reportService.downloadFile(this.selectedReport.downloadWordUrl, this.params)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.blockUi.stop())
      )
      .subscribe((res: any) => {
        if (res.success) {
          const blob = this.dataURItoBlob(res.data)
          saveAs(blob, `${this.selectedReport.title}.docx`)
        }
      })
  }

  downloadExcel() {
    this.blockUi.start('Downloading...')
    this.reportService.downloadFile(this.selectedReport.downloadExcelUrl, this.params)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.blockUi.stop())
      )
      .subscribe((res: any) => {
        if (res.success) {
          const blob = this.dataURItoBlob(res.data)
          saveAs(blob, `${this.selectedReport.title}.xlsx`)
        }
      })
  }

  downloadPdf() {
    this.blockUi.start('Downloading...')
    this.reportService.downloadFile(this.selectedReport.downloadPdfUrl, this.params)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.blockUi.stop())
      )
      .subscribe((res: any) => {
        if (res.success) {
          const blob = this.dataURItoBlob(res.data)
          saveAs(blob, `${this.selectedReport.title}.pdf`)
        }
      })
  }

  private dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
