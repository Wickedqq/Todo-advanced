import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { FavoriteTodosPage } from '../pages/FavoriteTodosPage';
import { DeletedTodosPage } from '../pages/DeletedTodosPage';
import { UserPage } from '../pages/UserPage';
// ---------------------------------------------------------------
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { AddTodo } from '../components/AddTodo-btn';
import { AddTodoSheet } from '../components/AddTodo-sheet';
import { Todo } from '../components/Todo';
import { TodoSmall } from '../components/TodoSmall';
import { PageWrapper } from '../components/PageWrapper';
import { UsernameUpdateComponent } from '../components/UsernameUpdate-component';
import { EmailUpdateComponent } from '../components/EmailUpdate-component';
import { PasswordUpdateComponent } from '../components/PasswordUpdate-component';
import { UserSidebar } from '../components/UserSidebar';
import { UserShowDown } from '../components/UserShowDown';
import { SearchShowDown } from '../components/SearchShowDown';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { SkeletonLoaderSmall } from '../components/SkeletonLoaderSmall';

// page exports
export { HomePage, LoginPage, RegisterPage, FavoriteTodosPage, DeletedTodosPage, UserPage };

// components exports
export {
  Header,
  Sidebar,
  AddTodoSheet,
  AddTodo,
  Todo,
  TodoSmall,
  PageWrapper,
  EmailUpdateComponent,
  UsernameUpdateComponent,
  PasswordUpdateComponent,
  UserSidebar,
  UserShowDown,
  SearchShowDown,
  SkeletonLoader,
  SkeletonLoaderSmall,
};
