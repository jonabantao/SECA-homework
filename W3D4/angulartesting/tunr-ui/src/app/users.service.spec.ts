import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { UsersService } from './users.service';
import { User } from './types/user';
import { HttpResponse } from '@angular/common/http';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  let dummyUserId: number;
  let dummyUser: User;
  let dummyUsers: User[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UsersService
      ]
    })
      .compileComponents();

    service = TestBed.get(UsersService);
    httpMock = TestBed.get(HttpTestingController);

    dummyUserId = 1;
    dummyUser = {
      id: 1,
      userName: 'tester',
      firstName: 'firstname',
      lastName: 'lastname',
    };
    dummyUsers = [dummyUser];
  }));

  describe('getUsers()', () => {
    it('should return success', async(() => {
      service.getUsers()
        .subscribe((res: User[]) => {
          // When observable resolves, result should match test data
          expect(res).toEqual(dummyUsers);
          expect(res.length).toBe(1);
        });

      // The following `expectOne()` will match the request's URL.
      const mock = httpMock.expectOne('/api/users');

      // Assert that the request is a GET.
      expect(mock.request.method).toBe('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      mock.flush(dummyUsers);

      // Finally, assert that there are no outstanding requests.
      httpMock.verify();
    }));
  });

  describe('getUser()', () => {
    it('should fetch the correct user', async(() => {
      service.getUser(dummyUserId)
        .subscribe((res: User) => {
          expect(res).toEqual(dummyUser);
        });

        const mock = httpMock.expectOne(`/api/users/${dummyUserId}`);
        expect(mock.request.method).toBe('GET');

        mock.flush(dummyUser);
        httpMock.verify();
    }));
  });

  describe('getUser()', () => {
    it('should fetch the correct user', async(() => {
      service.getUser(dummyUserId)
        .subscribe((res: User) => {
          expect(res).toEqual(dummyUser);
        });

      const mock = httpMock.expectOne(`/api/users/${dummyUserId}`);
      expect(mock.request.method).toBe('GET');

      mock.flush(dummyUser);
      httpMock.verify();
    }));
  });

  describe('deleteUser()', () => {
    it('should return HTTP status OK ', async(() => {
      service.deleteUser(dummyUserId)
        .subscribe((res: string) => {
          expect(res).toEqual('OK');
        });

      const mock = httpMock.expectOne(`/api/users/${dummyUserId}`);
      expect(mock.request.method).toBe('DELETE');

      mock.flush('OK');
      httpMock.verify();
    }));
  });

  describe('updateUser()', () => {
    let updatedUser: User;

    it('should return the updated user information', async(() => {
      updatedUser = {
        id: 1,
        userName: 'tester',
        firstName: 'testfirst',
        lastName: 'testlast',
      };

      service.updateUser(updatedUser)
        .subscribe((res: User) => {
          expect(res).toEqual(updatedUser);
        });

      const mock = httpMock.expectOne(`/api/users/${dummyUserId}`);
      expect(mock.request.method).toBe('PATCH');

      mock.flush(updatedUser);
      httpMock.verify();
    }));
  });
});
