import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  const mockDialogData: ConfirmDialogData = {
    title: 'Confirmar Acción',
    message: '¿Estás seguro de que quieres continuar?',
    confirmText: 'Sí, continuar',
    cancelText: 'Cancelar',
    type: 'warning'
  };

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [MatIconModule, MatButtonModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have dialog data injected', () => {
    expect(component.data).toEqual(mockDialogData);
  });

  it('should close dialog with true when confirm is called', () => {
    component.onConfirm();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when cancel is called', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should handle dialog data with default values', async () => {
    const defaultData: ConfirmDialogData = {
      title: 'Test Title',
      message: 'Test Message'
    };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [MatIconModule, MatButtonModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: defaultData }
      ]
    }).compileComponents();

    const defaultFixture = TestBed.createComponent(ConfirmDialogComponent);
    const defaultComponent = defaultFixture.componentInstance;

    expect(defaultComponent.data.title).toBe('Test Title');
    expect(defaultComponent.data.message).toBe('Test Message');
    expect(defaultComponent.data.confirmText).toBeUndefined();
    expect(defaultComponent.data.cancelText).toBeUndefined();
    expect(defaultComponent.data.type).toBeUndefined();
  });

  it('should handle different dialog types', async () => {
    const dangerData: ConfirmDialogData = {
      title: 'Danger Action',
      message: 'This is dangerous',
      type: 'danger'
    };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [MatIconModule, MatButtonModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dangerData }
      ]
    }).compileComponents();

    const dangerFixture = TestBed.createComponent(ConfirmDialogComponent);
    const dangerComponent = dangerFixture.componentInstance;

    expect(dangerComponent.data.type).toBe('danger');
  });

  it('should handle info type dialog', async () => {
    const infoData: ConfirmDialogData = {
      title: 'Information',
      message: 'This is informational',
      type: 'info'
    };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [MatIconModule, MatButtonModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: infoData }
      ]
    }).compileComponents();

    const infoFixture = TestBed.createComponent(ConfirmDialogComponent);
    const infoComponent = infoFixture.componentInstance;

    expect(infoComponent.data.type).toBe('info');
  });

  it('should handle custom confirm and cancel text', async () => {
    const customData: ConfirmDialogData = {
      title: 'Custom Dialog',
      message: 'Custom message',
      confirmText: 'Aceptar',
      cancelText: 'Rechazar'
    };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [MatIconModule, MatButtonModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: customData }
      ]
    }).compileComponents();

    const customFixture = TestBed.createComponent(ConfirmDialogComponent);
    const customComponent = customFixture.componentInstance;

    expect(customComponent.data.confirmText).toBe('Aceptar');
    expect(customComponent.data.cancelText).toBe('Rechazar');
  });

  it('should close dialog multiple times correctly', () => {
    component.onConfirm();
    expect(dialogRef.close).toHaveBeenCalledWith(true);

    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);

    expect(dialogRef.close).toHaveBeenCalledTimes(2);
  });
});
