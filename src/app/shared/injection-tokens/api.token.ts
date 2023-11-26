import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const API_URL = new InjectionToken<BehaviorSubject<string>>(' apiUrl');
