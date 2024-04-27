import { UserService } from '@/services/api/Users/UsersService';

export default function ListUsers() {
  const users = UserService.list();
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
}