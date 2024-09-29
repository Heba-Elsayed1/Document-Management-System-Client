import { Routes } from '@angular/router';
import { DirectoryComponent } from './features/directory/pages/directory/directory.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { PageNotFoundComponent } from './core/error/page-not-found/page-not-found.component';
import { AuthGuard } from './core/auth/auth.guard.service';
import { WorkspaceComponent } from './features/workspace/pages/workspace/workspace.component';
import { DocumentComponent } from './features/document/pages/document/document.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { UsersComponent } from './features/user/pages/users/users.component';
import { AccountComponent } from './features/user/pages/account/account.component';

export const routes: Routes = [
    {   path: 'directory',
        component: DirectoryComponent
    },
    {   path: 'workspace',
        component: WorkspaceComponent
    },
    {   path: 'document/:id',
        component: DocumentComponent
    },
    {   path: 'register',
        component: RegisterComponent
    },
    {   path: 'login',
        component: LoginComponent
    },
    {   path: 'workspace',
        component: WorkspaceComponent
    },
    {   path: 'users',
        component: UsersComponent
    },
    {   path: 'account',
        component: AccountComponent,
        canActivate :[AuthGuard]
    },
    {   path: 'home',
        component: HomeComponent ,
        canActivate :[AuthGuard]
    },
    { 
        path: '',
        redirectTo: '/home', 
        pathMatch: 'full'
     },
    {   path: '**',
        component: PageNotFoundComponent
    },

];
