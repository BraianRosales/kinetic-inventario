import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });
    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should call snackBar.open with correct parameters', () => {
      service.show('success', 'Test Title', 'Test Message');

      expect(snackBar.open).toHaveBeenCalledWith(
        'Test Title: Test Message',
        'Cerrar',
        {
          duration: 3000,
          panelClass: 'notification-success',
          horizontalPosition: 'end',
          verticalPosition: 'top',
        }
      );
    });

    it('should call snackBar.open without message', () => {
      service.show('error', 'Test Title');

      expect(snackBar.open).toHaveBeenCalledWith(
        'Test Title',
        'Cerrar',
        {
          duration: 3000,
          panelClass: 'notification-error',
          horizontalPosition: 'end',
          verticalPosition: 'top',
        }
      );
    });

    it('should use correct panel class for each type', () => {
      service.show('warning', 'Test');
      expect(snackBar.open).toHaveBeenCalledWith(
        jasmine.any(String),
        jasmine.any(String),
        jasmine.objectContaining({
          panelClass: 'notification-warning'
        })
      );

      service.show('info', 'Test');
      expect(snackBar.open).toHaveBeenCalledWith(
        jasmine.any(String),
        jasmine.any(String),
        jasmine.objectContaining({
          panelClass: 'notification-info'
        })
      );
    });
  });

  describe('success', () => {
    it('should call show with success type', () => {
      spyOn(service, 'show');
      service.success('Success Title', 'Success Message');

      expect(service.show).toHaveBeenCalledWith('success', 'Success Title', 'Success Message');
    });

    it('should call show without message', () => {
      spyOn(service, 'show');
      service.success('Success Title');

      expect(service.show).toHaveBeenCalledWith('success', 'Success Title', undefined);
    });
  });

  describe('error', () => {
    it('should call show with error type', () => {
      spyOn(service, 'show');
      service.error('Error Title', 'Error Message');

      expect(service.show).toHaveBeenCalledWith('error', 'Error Title', 'Error Message');
    });
  });

  describe('warning', () => {
    it('should call show with warning type', () => {
      spyOn(service, 'show');
      service.warning('Warning Title', 'Warning Message');

      expect(service.show).toHaveBeenCalledWith('warning', 'Warning Title', 'Warning Message');
    });
  });

  describe('info', () => {
    it('should call show with info type', () => {
      spyOn(service, 'show');
      service.info('Info Title', 'Info Message');

      expect(service.show).toHaveBeenCalledWith('info', 'Info Title', 'Info Message');
    });
  });
});
