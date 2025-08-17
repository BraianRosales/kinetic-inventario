import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  show(type: NotificationType, title: string, message?: string): void {
    const duration = 3000;
    const panelClass = `notification-${type}`;
    
    const fullMessage = message ? `${title}: ${message}` : title;
    
    this.snackBar.open(fullMessage, 'Cerrar', {
      duration,
      panelClass,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  success(title: string, message?: string): void {
    this.show('success', title, message);
  }

  error(title: string, message?: string): void {
    this.show('error', title, message);
  }

  warning(title: string, message?: string): void {
    this.show('warning', title, message);
  }

  info(title: string, message?: string): void {
    this.show('info', title, message);
  }
}
