import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import {CompareData} from './compare-data.model';
import {AuthService} from '../user/auth.service';
import {environment} from "../../environments/environment";

@Injectable()
export class CompareService {
  dataEdited = new BehaviorSubject<boolean>(false);
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoaded = new Subject<CompareData[]>();
  dataLoadFailed = new Subject<boolean>();
  userData: CompareData;

  private serverUrl = environment.serverUrl;

  constructor(private http: Http,
              private authService: AuthService) {
  }

  onStoreData(data: CompareData) {
    this.dataLoadFailed.next(false);
    this.dataIsLoading.next(true);
    this.dataEdited.next(false);
    this.userData = data;
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        return;
      }
      let idToken = session.getIdToken().getJwtToken();

      this.http.post(`${this.serverUrl}/compare-yourself`, data, {
        headers: new Headers({'Authorization': idToken})
      })
        .subscribe(
          (result) => {
            this.dataLoadFailed.next(false);
            this.dataIsLoading.next(false);
            this.dataEdited.next(true);
          },
          (error) => {
            this.dataIsLoading.next(false);
            this.dataLoadFailed.next(true);
            this.dataEdited.next(false);
          }
        );
    });

  }

  onRetrieveData(all = true) {
    this.dataLoaded.next(null);
    this.dataLoadFailed.next(false);
    let queryParam = '';
    let urlParam = 'all';
    if (!all) {
      urlParam = 'single';
    }

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const idToken = session.getIdToken().getJwtToken();
      const accessToken = session.getAccessToken().getJwtToken();
      queryParam = `?accessToken=${accessToken}`

      this.http.get(`${this.serverUrl}/compare-yourself/${urlParam}${queryParam}`, {
        headers: new Headers({'Authorization': idToken})
      })
        .map(
          (response: Response) => response.json()
        )
        .subscribe(
          (data) => {
            if (all) {
              this.dataLoaded.next(data);
            } else {
              console.log(data);
              if (!data) {
                this.dataLoadFailed.next(true);
                return;
              }
              this.userData = data[0];
              this.dataEdited.next(true);
            }
          },
          (error) => {
            this.dataLoadFailed.next(true);
            this.dataLoaded.next(null);
          }
        );
    });
  }

  onDeleteData() {
    this.dataLoadFailed.next(false);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const idToken = session.getIdToken().getJwtToken();

      this.http.delete(`${this.serverUrl}/compare-yourself`, {
        headers: new Headers({'Authorization': idToken})
      })
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => this.dataLoadFailed.next(true)
        );
    });
  }
}
